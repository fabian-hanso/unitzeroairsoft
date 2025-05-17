"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider, useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout/SidebarLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="w-screen h-dvh flex justify-center items-center">
        <img src="/Logo.svg" className="w-40 h-40" />
      </div>
    );

  if (!user) return null;

  return <SidebarLayout userData={user}>{children}</SidebarLayout>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
    >
      <AuthProvider>
        <DashboardContent>{children}</DashboardContent>
      </AuthProvider>
    </div>
  );
}
