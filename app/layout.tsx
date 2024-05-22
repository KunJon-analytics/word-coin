import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { Toaster } from "@/components/ui/toaster";
import TwaProvider from "@/components/twa/twa-provider";
import { siteConfig } from "@/config/site";

import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable
        )}
      >
        <TwaProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </TwaProvider>
        <Analytics />
      </body>
    </html>
  );
}
