'use client';

import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '스케줄러',
  description: '일정을 관리하세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const isSysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && isSysDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  return (
    <html lang="ko" className={isDark ? 'dark' : ''}>
      <body className={`${inter.className} bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500`}>
        {children}
      </body>
    </html>
  );
} 