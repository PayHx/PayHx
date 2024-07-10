import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { Toaster } from "@/components/ui/toaster";

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
          <div className="navbar">
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="logo"/>
            </Link>
            <div className="nav-links">
              <Link legacyBehavior href="/updates">
                <a className="font-american-typewriter">Updates</a>
              </Link>
              <Link legacyBehavior href="/about-us">
                <a className="font-american-typewriter">About Us</a>
              </Link>
              <Link legacyBehavior href="/submit-salary">
                <a className="font-american-typewriter">Submit Salary</a>
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
