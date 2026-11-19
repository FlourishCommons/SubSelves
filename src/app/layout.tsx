import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { AuthGate, AuthLoading } from "@/components/AuthGate";
import { AuthProvider } from "@/lib/hooks/useAuth";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SubSelves",
  description: "Free, community-funded Parts Work for intergenerational healing. No ads, no tracking, open source.",
  openGraph: {
    title: "SubSelves — Free Parts Work for Everyone",
    description: "Community-funded, open-source IFS tools. No ads, no tracking.",
    type: "website",
    locale: "en_US",
    siteName: "SubSelves",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SubSelves — Free Parts Work for Everyone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SubSelves — Free Parts Work for Everyone",
    description: "Community-funded, open-source IFS tools. No ads, no tracking.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://opencollective.com" />
      </head>
      <body className="min-h-full flex flex-col bg-ivory pt-14 text-ink">
        <AuthProvider>
          <Suspense fallback={<div className="fixed top-0 left-0 right-0 h-14 bg-ivory" />}>
            <TopNav />
          </Suspense>
          <Suspense fallback={<AuthLoading />}>
            <AuthGate>{children}</AuthGate>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}