import { trim } from "lodash";
import { Contrail_One, Poppins } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";

import type { Metadata, Viewport } from "next";

import Analytics from "@/components/track/Analytics";
import { SEASON_BOOT_SCRIPT } from "@/lib/season/script";
import { SeasonProvider } from "@/providers/season";

import "@/app/globals.css";

const display = Contrail_One({
  weight: "400",
  variable: "--font-contrail-one",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const SITE_URL = "https://www.donkeylee.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yun-Chen Lee — Frontend Engineer",
    template: "%s · Yun-Chen Lee",
  },
  description:
    "Personal portfolio of Yun-Chen (Donkey) Lee — frontend engineer crafting calm, performant web experiences. A koi pond of projects, experiences, and ideas.",
  keywords: [
    "Yun-Chen Lee",
    "Donkey Lee",
    "Frontend Engineer",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Three.js",
    "NTU CSIE",
  ],
  authors: [{ name: "Yun-Chen Lee", url: SITE_URL }],
  creator: "Yun-Chen Lee",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Yun-Chen Lee — Frontend Engineer",
    description:
      "A living koi pond portfolio. Projects, experience, and a quiet place to learn about my work.",
    siteName: "Donkey Lee Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 800,
        height: 800,
        alt: "Yun-Chen Lee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yun-Chen Lee — Frontend Engineer",
    description:
      "A living koi pond portfolio of projects, experience, and ideas.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3fbf6" },
    { media: "(prefers-color-scheme: dark)", color: "#143e35" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await headers();
  const city = header.get("Analytics-City") ?? "";
  const flag = header.get("Analytics-Flag") ?? "";
  const countryRegion = header.get("Analytics-CountryRegion") ?? "";
  const latitude = header.get("Analytics-Latitude") ?? "";
  const longitude = header.get("Analytics-Longitude") ?? "";
  const time = header.get("Analytics-Time") ?? "";
  const host = header.get("host") ?? "";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Sets the season palette before paint to avoid a palette flash on
            first load when the user has previously chosen a non-default season. */}
        <Script
          id="season-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: SEASON_BOOT_SCRIPT }}
        />
      </head>
      <body
        className={`${display.variable} ${poppins.variable} font-sans text-ink bg-canvas`}
      >
        <SeasonProvider>{children}</SeasonProvider>
        <Analytics
          city={trim(`${flag} ${city}`)}
          countryRegion={countryRegion}
          latitude={latitude}
          longitude={longitude}
          time={time}
          host={host}
        />
      </body>
    </html>
  );
}
