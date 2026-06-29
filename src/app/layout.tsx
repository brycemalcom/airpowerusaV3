import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PerformanceMonitor from "@/components/common/PerformanceMonitor";
import ScrollToTop from "@/components/common/ScrollToTop";
import DefaultIntlProvider from "@/components/i18n/DefaultIntlProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AirPower USA | Clean Power From Thin Air",
  description: "Zero-emission compressed air engine systems powering the future. Deployable clean energy engineered for anywhere the grid can't reach.",
  keywords: ["clean energy", "compressed air engine", "zero emissions", "mobile power", "sustainable technology"],
  authors: [{ name: "AirPower USA" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
  openGraph: {
    title: "AirPower USA | Clean Power From Thin Air",
    description: "Zero-emission compressed air engine systems powering the future. Deployable clean energy engineered for anywhere the grid can't reach.",
    url: "https://airpowerusa.com",
    siteName: "AirPower USA",
    images: [
      {
        url: "/media/images/air_tanks.png",
        width: 1200,
        height: 630,
        alt: "AirPower USA - Compressed Air Storage Technology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AirPower USA | Clean Power From Thin Air",
    description: "Zero-emission compressed air engine systems powering the future. Deployable clean energy engineered for anywhere the grid can't reach.",
    images: ["/media/images/air_tanks.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <ScrollToTop />
        {/* Default English provider ensures components using useTranslations work on non-locale routes */}
        <DefaultIntlProvider>{children}</DefaultIntlProvider>
        <PerformanceMonitor />
        <Analytics />
      </body>
    </html>
  );
}
