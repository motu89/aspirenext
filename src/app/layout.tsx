import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentMethods from "@/components/PaymentMethods";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aspire Furniture UK - Premium Furniture at Budget Prices",
  description:
    "Shop premium quality furniture at budget prices. Wardrobes, Sofas, Beds, Wall Panels & more. Free UK delivery, Cash on Delivery available.",
  keywords: [
    "Aspire Furniture",
    "furniture UK",
    "wardrobes",
    "sofas",
    "beds",
    "wall panels",
    "dressing tables",
    "budget furniture",
  ],
  icons: {
    icon: "/images/logo.ico",
  },
  other: {
    "theme-color": "#8b5e3c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <PaymentMethods />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
