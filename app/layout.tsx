import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/redux/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kacchidine.com"), // change when deployed

  title: "Kacchi Dine – Authentic Kacchi Biryani",
  description:
    "Order authentic Bangladeshi-style Kacchi Biryani, Borhani and more from Kacchi Dine. Fresh, hot & delivered fast.",

  keywords: [
    "kacchi dine",
    "kacchi biryani",
    "best biryani in dhaka",
    "bangladeshi cuisine",
    "dhaka food delivery",
    "traditional biryani",
    "bangladeshi food",
    "order kacchi online",
  ],

  openGraph: {
    title: "Kacchi Dine",
    description: "Authentic Kacchi Biryani & Traditional Bangladeshi Food",
    url: "https://kacchidine.com",
    siteName: "Kacchi Dine",
    images: [
      {
        url: "/kacchi_logo.png", // must start with /
        width: 1200,
        height: 630,
        alt: "Kacchi Dine Logo",
      },
    ],
    locale: "en_BD",
    type: "website",
  },

  icons: {
    icon: "/kacchi_logo.png",
    shortcut: "/kacchi_logo.png",
    apple: "/kacchi_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#fffaf5] text-gray-900 min-h-screen flex flex-col`}
      >
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
