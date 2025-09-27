import { z } from "zod";
import AuthService from "@/lib/auth";
import { config } from "./config";

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export function createApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.discriminatedUnion("success", [
    z.object({
      success: z.literal(true),
      message: z.string(),
      data: dataSchema,
    }),
    z.object({
      success: z.literal(false),
      message: z.string(),
    }),
  ]);
}

// Add a type helper for the API response
type ApiResponse<T> =
  | { success: true; message: string; data: T }
  | { success: false; message: string };

export class ApiClient {
  private readonly baseUrl: string;
  private readonly sessionId?: string;

  constructor(sessionId?: string) {
    this.baseUrl = `${config.backendUrl}/api/v1`;
    this.sessionId = sessionId;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.sessionId) {
      headers.Authorization = `Bearer ${this.sessionId}`;
    }

    return headers;
  }

  private async _request<T extends z.ZodTypeAny>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    schema: T,
    data?: unknown,
  ): Promise<z.infer<T>> {
    if (!this.sessionId) {
      throw new ApiClientError(
        "Authentication required to make this request",
        401,
      );
    }

    const url = `${this.baseUrl}${
      endpoint.startsWith("/") ? endpoint : `/${endpoint}`
    }`;

    try {
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new ApiClientError("API request failed", response.status);
      }

      if (method === "DELETE") {
        // DELETE returns no data, so no need to parse
        return null as z.infer<T>; // Return null as the inferred type
      }

      const json = await response.json();

      // Dynamically create the full response schema
      const responseSchema = createApiResponseSchema(schema);
      const parsed = responseSchema.safeParse(json);

      if (!parsed.success) {
        throw new ApiClientError(
          "Invalid API response shape.",
          response.status,
        );
      }

      // Explicitly type the apiResponse to help TypeScript with narrowing
      const apiResponse = parsed.data as ApiResponse<z.infer<T>>;

      if (apiResponse.success) {
        // TypeScript now knows this branch has the data property
        return apiResponse.data;
      } else {
        throw new ApiClientError(
          apiResponse.message || "API request failed",
          response.status,
        );
      }
    } catch (error) {
      if (error instanceof ApiClientError) throw error;
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      throw new ApiClientError(`${method} ${endpoint} failed: ${message}`);
    }
  }

  async get<T extends z.ZodTypeAny>(
    endpoint: string,
    responseSchema: T,
  ): Promise<z.infer<T>> {
    return this._request(endpoint, "GET", responseSchema);
  }

  async post<T extends z.ZodTypeAny>(
    endpoint: string,
    responseSchema: T,
    data?: unknown,
  ): Promise<z.infer<T>> {
    return this._request(endpoint, "POST", responseSchema, data);
  }

  async put<T extends z.ZodTypeAny>(
    endpoint: string,
    responseSchema: T,
    data?: unknown,
  ): Promise<z.infer<T>> {
    return this._request(endpoint, "PUT", responseSchema, data);
  }

  async delete<T extends z.ZodTypeAny>(
    endpoint: string,
    responseSchema: T,
  ): Promise<z.infer<T>> {
    return this._request(endpoint, "DELETE", responseSchema);
  }
}

export function createApiClient(sessionId?: string): ApiClient {
  return new ApiClient(sessionId);
}

export async function createAuthenticatedApiClient(): Promise<ApiClient> {
  const session = await AuthService.auth();
  if (!session?.user?.sessionId) {
    throw new ApiClientError("No valid session found", 401);
  }
  return new ApiClient(session.user.sessionId);
}
