"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("token");
    
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (!isMounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

