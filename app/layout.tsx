import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GSAPInit from "@/components/GSAPInit";
import Nav from "@/components/Nav";

const recoleta = localFont({
  src: [
    { path: "./fonts/fonnts.com-recoleta-regular.otf", weight: "400" },
    { path: "./fonts/fonnts.com-recoleta-medium.otf", weight: "500" },
  ],
  variable: "--font-recoleta",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/DMSans-VariableFont_opsz,wght.ttf",
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rocca Mare Resort",
  description: "An intimate Mediterranean retreat. Stone, sea, and stillness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${recoleta.variable} ${dmSans.variable}`}
    >
      <body>
        <GSAPInit />
        <Nav />
        {children}
      </body>
    </html>
  );
}
