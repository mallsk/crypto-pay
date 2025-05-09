import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { WalletConnector } from "@/components/ui/WalletConnector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto-Pay",
  description: "QR Based Crypto Payment on Solana Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <WalletConnector>
      <body suppressHydrationWarning={true} 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider  attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        {children}
        </ThemeProvider>
      </body>
      </WalletConnector>
    </html>
  );
}
