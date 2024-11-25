import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Contrail_One } from "next/font/google";

import type { Metadata } from "next";

import StyledComponentsRegistry from "@/libs/styled-components";
import ThemeProvider from "@/providers/theme";

import "@/app/globals.css";

const font = Contrail_One({
  weight: "400",
  variable: "--contrail-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donkey Portfolio",
  description: "The application built in Next for Donkey Lee's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.variable}>
        <StyledComponentsRegistry>
          <AntdRegistry>
            <ThemeProvider>{children}</ThemeProvider>
          </AntdRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
