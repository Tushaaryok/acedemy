import type { Metadata } from "next";
import { Inter, Baloo_2, Noto_Sans } from "next/font/google";
// @ts-ignore
import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FloatingActions from "@/components/ui/floating-actions";
import FloatingDoubtButton from "@/components/ui/floating-doubt-button";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const baloo2 = Baloo_2({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800'], variable: '--font-baloo' });
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ['400', '500', '700'], variable: '--font-noto' });

import SchemaOrg from "@/components/layout/SchemaOrg";

export const metadata: Metadata = {
  title: "Krishna Academy Upleta | Best Coaching & Tuition Classes in Upleta",
  description: "Join Krishna Academy Upleta for expert coaching in Science and Commerce (Std 8-12). Upleta's #1 coaching institute with proven results and experienced faculty.",
  metadataBase: new URL('https://krishnaacademyupleta.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Krishna Academy Upleta | Best Coaching & Tuition Classes",
    description: "Shape Your Future With Excellence. Leading coaching institute in Upleta for Std 8-12.",
    url: 'https://krishnaacademyupleta.vercel.app',
    siteName: 'Krishna Academy',
    images: [
      {
        url: '/imgs/logo.jpeg',
        width: 800,
        height: 600,
        alt: 'Krishna Academy Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Krishna Academy Upleta | Best Coaching classes",
    description: "Expert faculty & proven results in Upleta, Gujarat.",
    images: ['/imgs/logo.jpeg'],
  },
  keywords: ["krishna academy upleta", "best coaching classes in upleta", "tuition classes upleta", "commerce coaching upleta", "science coaching upleta", "std 10 board upleta", "std 12 science upleta"],
};

import QueryProvider from "@/components/ui/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${baloo2.variable} ${notoSans.variable}`}>
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          {children}
          <SchemaOrg />
          <Footer />
          <FloatingActions />
          <FloatingDoubtButton />
          <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
        </QueryProvider>
      </body>
    </html>
  );
}
