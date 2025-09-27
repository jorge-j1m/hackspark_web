export const config = {
    backendUrl: process.env.API_URL || "http://localhost:8080",
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    nextAuthSecret: process.env.NEXTAUTH_SECRET || "secret",
} as const;
