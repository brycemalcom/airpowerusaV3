import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invest in AI-Ready Clean Energy | AirPower USA",
  description:
    "AirPower USA is raising $25M under Reg D to scale clean, compressed-air energy technology. Zero emissions. No water. Power + cooling in one system. Schedule a call with our investor team.",
  keywords: [
    "clean energy investment",
    "AI energy",
    "compressed air engine",
    "Reg D investment",
    "accredited investor",
    "AirPower USA",
    "zero emission power",
    "data center cooling",
  ],
  openGraph: {
    title: "Invest in AI-Ready Clean Energy | AirPower USA",
    description:
      "AirPower USA is raising $25M under Reg D to scale clean compressed-air energy technology. Clean power plus cold-air output for AI infrastructure and off-grid demand.",
    url: "https://invest.airpowerusa.net/lp/ai-clean-energy",
    siteName: "AirPower USA",
    images: [
      {
        url: "/media/images/air_tanks.png",
        width: 1200,
        height: 630,
        alt: "AirPower USA - Clean Energy Investment Opportunity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest in AI-Ready Clean Energy | AirPower USA",
    description:
      "AirPower USA is raising $25M under Reg D to scale clean compressed-air energy technology. Clean power plus cold-air output for AI infrastructure and off-grid demand.",
    images: ["/media/images/air_tanks.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
