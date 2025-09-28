"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// app/not-found.tsx
export default function NotFound() {
  const pathname = usePathname();
  const [message, setMessage] = useState<string>("");
  console.log(pathname);
  useEffect(() => {
    if (pathname == "/explore" || pathname == "/trending") {
      setMessage(
        `The ${pathname.charAt(1).toUpperCase() + pathname.slice(2)} page has not been developed yet`,
      );
    } else {
      setMessage("Sorry, the page you are looking for doesn’t exist.");
    }
  }, [pathname]);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-muted-foreground">{message}</p>
      <a
        href="/"
        className="mt-6 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/85"
      >
        Go back home
      </a>
    </div>
  );
}
