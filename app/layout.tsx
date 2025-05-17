"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import UnderConstruction from "@/components/UnderConstruction/UnderConstruction";
import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Unit Zero - Airsoft",
//   description: "Airsoftteam",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const construction: boolean = false;
  const pathname = usePathname();
  const hideHeaderFooter =
    pathname.startsWith("/login") || pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {construction ? (
          <>
            <Analytics />
            <UnderConstruction />
          </>
        ) : (
          <>
            <Analytics />
            {hideHeaderFooter ? null : <Navbar />}
            {children}
            {hideHeaderFooter ? null : <Footer />}
          </>
        )}
      </body>
    </html>
  );
}
