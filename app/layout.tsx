import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import PromptInput from '@/components/PromptInput';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Arts',
  description: 'AI Arts Generated by DALL-E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <PromptInput />
      </body>
    </html>
  );
}
