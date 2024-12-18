import { AntdRegistry } from "@ant-design/nextjs-registry";
import { trim } from "lodash";
import { Contrail_One, Poppins } from "next/font/google";
import { headers } from "next/headers";

import type { Metadata } from "next";

import Analytics from "@/components/track/Analytics";
import StyledComponentsRegistry from "@/libs/styled-components";
import Intro from "@/modules/intro";
import AntdProvider from "@/providers/antd/config";
import ThemeProvider from "@/providers/theme";

import "@/app/globals.css";

const font = Contrail_One({
  weight: "400",
  variable: "--contrail-one",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Donkey Portfolio",
  description: "The application built in Next for Donkey Lee's Portfolio",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
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
    <html lang="en">
      <body className={`${font.variable} ${poppins.variable}`}>
        <StyledComponentsRegistry>
          <AntdRegistry>
            <ThemeProvider>
              <AntdProvider>
                <Intro />
                {children}
              </AntdProvider>
            </ThemeProvider>
          </AntdRegistry>
        </StyledComponentsRegistry>
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
