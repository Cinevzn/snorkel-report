import type { Metadata } from "next";
import ThemeProvider from '@/components/providers/ThemeProvider';
import "./globals.css";

export const metadata: Metadata = {
  title: "Hawaii Snorkel Conditions Forecast",
  description: "Real-time snorkeling conditions forecast for Hawaii's best snorkel beaches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
