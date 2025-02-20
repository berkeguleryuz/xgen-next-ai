import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-neutral-950`}>
        <div className="absolute top-0 z-[-2] opacity-50 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_70%_60%_at_50%_-20%,rgba(64,203,90,0.8),rgba(255,255,255,0))]" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
