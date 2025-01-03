import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { Toaster } from "@/components/ui/toaster";
import { MainSeparator } from "@/components/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayHx",
  description: "Real salaries real people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto py-10">
          <div className="flex items-center justify-between mb-6">
              <Link href="/">
                <img src="/logo.png" alt="Logo" className="logo"/>
              </Link>
              <MainSeparator />
           </div>
          </div>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
