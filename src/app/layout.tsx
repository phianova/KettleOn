import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lilita_One } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import { Toaster } from "../components/shadcn/toaster"


const inter = Inter({ subsets: ["latin"] });
const lilita = Lilita_One({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KettleOn",
  description: "A team building platform for remote workers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head> 
      <meta property="og:image" content="<generated>" />
  <meta property="og:image:type" content="<generated>" />
  <meta property="og:image:width" content="<generated>" />
  <meta property="og:image:height" content="<generated>" />

      <link rel="icon" href="/favicon.ico" sizes="any" />
      
      <link
  rel="icon"
  href="/icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/>
<link
  rel="apple-touch-icon"
  href="/apple-icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/>
    
      </head>
      
      <Providers>
      <body className={`${lilita.className} pagebg`}>
        {children}
        <Toaster/>
      </body>
      </Providers>
    </html>
  );
}
