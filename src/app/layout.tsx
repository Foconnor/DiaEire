import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/components/cookiesConsent";

const poppins = Poppins({
  variable: "--Poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Ireland's Christian conservative party | Dia le hÉireann",
  description:
    "The Irish Christian conservative party with a plan to halt cultural, economic and social collapse and restore Éire's sovereignty. The people's voice matters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="apple-mobile-web-app-title" content="Dia le hÉireann" />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster position="top-right" />
        <CookieConsent />
      </body>
    </html>
  );
}
