import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Vidora AI - Next-Gen Video Platform",
  description: "Create, share, and analyze videos with the power of AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased bg-[#030014] text-white`}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}