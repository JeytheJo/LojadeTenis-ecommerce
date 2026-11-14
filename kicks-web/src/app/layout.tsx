import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./kicks.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: "400" });

export const metadata: Metadata = {
  title: "Kicks&Co.",
  description: "Design que acolhe, materiais que duram.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
