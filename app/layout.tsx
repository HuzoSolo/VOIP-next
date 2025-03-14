import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { NextAuthProvider } from "@/providers/NextAuthProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VOIP Communication App',
  description: 'A modern VOIP communication platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}