"use client";

import { AuthProvider, useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarLayout from "@/components/SidebarLayout/SidebarLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else {
        setAuthChecked(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !authChecked) return <div>Loading...</div>;

  // SidebarLayout wird einmal gemountet und children werden dynamisch gewechselt
  return <SidebarLayout userData={user}>{children}</SidebarLayout>;
}
