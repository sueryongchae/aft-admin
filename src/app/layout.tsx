import GlobalStyles from '@/styles/GlobalStyles';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SnackBarBox from '@/components/SnackbarContainer';
import ToastBox from '@/components/ToastContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'aft-admin',
  description: '',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStyles />
        <SnackBarBox />
        <ToastBox />
        {children}
      </body>
    </html>
  );
}
