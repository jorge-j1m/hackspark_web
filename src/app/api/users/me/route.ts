import { NextResponse } from "next/server";
import { createAuthenticatedApiClient } from "@/lib/api-client";
import { UserDetailsSchema } from "@/types/users";

// GET endpoint
export async function GET() {
  try {
    const apiClient = await createAuthenticatedApiClient();
    const data = await apiClient.get("/users/me", UserDetailsSchema);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user details" },
      { status: 500 },
    );
  }
}
