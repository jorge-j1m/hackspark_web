import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { config } from "@/lib/config";
import { isValidSessionId } from "@/lib/utils";
import type { AuthUser } from "@/types";
import { AuthUserSchema, LoginResponseSchema } from "@/types";

// === VALIDATION ===
const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
  remember: z.string().optional(),
});

function validateUserData(user: unknown): user is AuthUser {
  return AuthUserSchema.safeParse(user).success;
}

// === API CLIENT ===
class AuthApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "AuthApiError";
  }
}

class AuthApiClient {
  private readonly baseUrl = config.backendUrl;

  async login(
    email: string,
    password: string,
    remember = false,
  ): Promise<AuthUser> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, remember }),
        },
      );

      if (!response.ok) {
        throw new AuthApiError(
          `Login failed: ${response.statusText}`,
          response.status,
        );
      }

      const rawResult = await response.json();

      // Validate API response with Zod
      const result = LoginResponseSchema.parse(rawResult);

      if (!result.success) {
        throw new AuthApiError(result.message, response.status);
      }

      // Validate user data with Zod
      const authUser = AuthUserSchema.parse(result.data);
      return authUser;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  }

  async logout(sessionId: string): Promise<boolean> {
    if (!isValidSessionId(sessionId)) {
      return false;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/auth/logout`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionId}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        console.warn(`Backend logout failed: ${response.status}`);
        return false;
      }

      const result = await response.json();
      return result.success === true;
    } catch (error) {
      console.warn("Backend logout failed:", error);
      return false;
    }
  }
}

const apiClient = new AuthApiClient();

// === NEXTAUTH CONFIGURATION ===
const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        const result = credentialsSchema.safeParse(credentials);
        if (!result.success) {
          return null;
        }

        const { email, password, remember } = result.data;

        try {
          const authUser = await apiClient.login(
            email,
            password,
            remember === "true",
          );
          return authUser;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // On sign in, store user data in token
      if (user && validateUserData(user)) {
        const authUser = user as AuthUser;
        token.id = authUser.id;
        token.email = authUser.email;
        token.sessionId = authUser.sessionId;
        token.firstName = authUser.firstName;
        token.lastName = authUser.lastName;
        token.username = authUser.username;
      }
      return token;
    },

    async session({ session, token }) {
      // Validate and send properties to the client
      const parsedSession = AuthUserSchema.safeParse(token);

      if (parsedSession.success) {
        const authUser = parsedSession.data;
        session.user = {
          id: authUser.id,
          email: authUser.email,
          sessionId: authUser.sessionId,
          firstName: authUser.firstName,
          lastName: authUser.lastName,
          username: authUser.username,
          emailVerified: null,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: config.nextAuthSecret,
  trustHost: true,
};

const { handlers, signOut, auth } = NextAuth(authConfig);

// Server-side logout function (for server actions/components only)
async function serverLogout(sessionId?: string): Promise<void> {
  try {
    // Try backend logout first if we have a sessionId
    if (sessionId) {
      await apiClient.logout(sessionId);
    }
  } catch (error) {
    // Don't block logout if backend fails
    console.warn("Backend logout failed:", error);
  }

  // Always perform NextAuth logout
  await signOut({ redirectTo: "/login" });
}

// Modern functional API - single source of truth for auth
const AuthService = {
  // NextAuth methods (server-side only)
  auth,
  handlers,
  serverSignOut: signOut,

  // Client-side compatible signIn function
  signIn: async (
    provider: string,
    credentials: {
      email: string;
      password: string;
      remember: string;
      redirectTo: string;
    },
  ) => {
    // For client-side, we'll redirect to the NextAuth signin page with credentials
    const { signIn: clientSignIn } = await import("next-auth/react");
    return clientSignIn(provider, credentials);
  },

  // Server-side logout only
  serverLogout,

  // Validation helper
  validateUserData,
} as const;

export default AuthService;
