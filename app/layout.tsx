// Main yedek 31.03.2025
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "xGen AI",
  description: "Find the best AI tools for your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-neutral-950`}
        suppressHydrationWarning>
        <div className="absolute top-0 z-[-2] opacity-50 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_70%_60%_at_50%_-20%,rgba(64,203,90,0.8),rgba(255,255,255,0))]" />
        <TooltipProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                duration: 2000,
                icon: "👏",
              },
              error: {
                duration: 2000,
                icon: "⁉️",
              },
              loading: {
                duration: 2000,
              },
              style: {
                background: "rgb(62, 92, 20)",
                color: "#fff",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "semibold",
                textAlign: "center",
                padding: "10px",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
              },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
