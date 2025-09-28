"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      if (pathname === "/dashboard") {
        router.replace("/");
        return;
      }
      if (pathname === "/create") {
        router.replace("/login");
        return;
      }
    } else {
      if (pathname === "/login") {
        router.replace("/dashboard");
        return;
      }
    }
  }, [session, status, pathname, router]);

  if (status === "loading") {
    // spinning component
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    if (pathname === "/dashboard" || pathname === "/create") {
      return null;
    }
  } else {
    if (pathname === "/login") {
      router.replace("/dashboard");
      return null;
    }
  }

  return <>{children}</>;
}
