import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import LayoutClient from "@/components/LayoutClient/LaoutClient";

export const metadata: Metadata = {
  title: "Unit Zero – Airsoft",
  description: "Das Airsoft-Team Unit Zero. Action. Taktik. Teamgeist.",
  openGraph: {
    title: "Unit Zero – Airsoft",
    description: "Das Airsoft-Team Unit Zero. Action. Taktik. Teamgeist.",
    url: "https://unit-zero.de",
    siteName: "Unit Zero Airsoft",
    images: [
      {
        url: "https://unit-zero.de/Fabian-Desktop.jpg",
        width: 1200,
        height: 630,
        alt: "Unit Zero Airsoft Titelbild",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Zero – Airsoft",
    description: "Das Airsoft-Team Unit Zero. Action. Taktik. Teamgeist.",
    images: ["https://unit-zero.de/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="...">
        <Analytics />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
