import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Analytics } from "@vercel/analytics/next";
import { Contrail_One, Poppins } from "next/font/google";

import type { Metadata } from "next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Analytics />
      </body>
    </html>
  );
}
