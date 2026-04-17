import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Script from "next/script";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import FloatingActions from "@/src/components/Global/FloatingActions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krishna Academy Upleta | Best Coaching in Upleta",
  description: "Shape Your Future With Excellence. Coaching for Class 8-12, Science & Commerce in Upleta, Gujarat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <FloatingActions />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
