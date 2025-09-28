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
    return <div>Loading...</div>;
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
