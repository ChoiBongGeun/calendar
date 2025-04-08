"use client";

import DailyPlanner from '@/components/organisms/DailyPlanner';
import DatePicker from '@/components/organisms/Calendar';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    // 초기 테마 설정
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    toggleDarkMode();
    const newIsDark = !isDarkMode;
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            해야 할일 관리
          </h1>
          <button
            onClick={handleThemeToggle}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-sm shadow hover:shadow-md transition-all duration-200"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[400px] mx-auto lg:mx-0">
            <DatePicker />
          </div>
          <div className="flex-1">
            <DailyPlanner />
          </div>
        </div>
      </div>
    </main>
  );
}
