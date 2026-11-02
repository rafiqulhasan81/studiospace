
"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  // Session check চলাকালীন
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  // Login না থাকলে
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Redirecting to login...
      </div>
    );
  }

  // Login থাকলে মূল পেজ দেখাবে
  return <>{children}</>;
}
