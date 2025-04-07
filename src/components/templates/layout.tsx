'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '스케줄러',
  description: '할일을 관리하고 알림을 받을 수 있는 일일 계획 관리 앱',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    const isSysDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (theme === 'dark' || (!theme && isSysDark)) {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = !isDark
    setIsDark(nextTheme)
    if (nextTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-sm shadow hover:shadow-md"
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
        {children}
      </body>
    </html>
  )
}
