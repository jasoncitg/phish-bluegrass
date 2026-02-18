import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Phish Out of Water",
  description:
    "Discover bluegrass moments from Phish's live history. Find a show where Phish played a bluegrass song, filtered by era.",
  keywords: ["Phish", "bluegrass", "live shows", "setlists", "Phish.net", "music"],
  openGraph: {
    title: "Phish Out of Water",
    description: "Find a bluegrass moment from Phish's live history.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Phish Out of Water",
    description: "Find a bluegrass moment from Phish's live history.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1b2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
