"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname.startsWith("/login");

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
    >
      {hideHeaderFooter ? null : <Navbar />}
      {children}
    </div>
  );
}
