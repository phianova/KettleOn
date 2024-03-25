import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lilita_One } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });
const lilita = Lilita_One({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kettle On",
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
      </body>
      </Providers>
    </html>
  );
}
