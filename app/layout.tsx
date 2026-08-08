import type { Metadata } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

// Distinctive, Japanese-capable pairing (self-hosted by next/font at build time).
const display = Shippori_Mincho({
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "サンプルスライド",
  description: "Next.js web slides demo (16:9, letterboxed)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
