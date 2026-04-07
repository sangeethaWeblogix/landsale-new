import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/icomoon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollToTopGlobal from "@/components/navigation/ScrollToTopGlobal";
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
  title: "Land Sales",
  description: "Find land for sale across Australia at Land Sales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=beVietnam-pro@200,300,400,500,600,700&f[]=zodiak@300,400,700,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased body`}
      >
        <Suspense fallback={null}>
          <ScrollToTopGlobal />
        </Suspense>
        <div id="wrapper">
          <div id="pagee" className="clearfix">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
