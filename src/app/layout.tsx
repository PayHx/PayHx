import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

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
      <nav>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ width: '188px', margin: '55px 0px 33px 158px'}}></img>
        <div>
          <Link legacyBehavior href="/about-us">
            <a style={{ marginLeft: '700px'}}>About Us</a>
          </Link>
          <Link legacyBehavior href="/submit-salary">
            <a style={{ marginLeft: '33px'}}>Submit Salary</a>
          </Link>
        </div>
        </div>
        {children}
      </nav>
      </body>
    </html>
  );
}
