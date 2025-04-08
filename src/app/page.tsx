"use client";

import DailyPlanner from '@/components/organisms/DailyPlanner';
import DatePicker from '@/components/organisms/Calendar';
import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [showNotificationMessage, setShowNotificationMessage] = useState(false);

  useEffect(() => {
    // 초기 테마 설정
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 알림 권한 요청
    if ('Notification' in window) {
      if (Notification.permission === 'denied') {
        setShowNotificationMessage(true);
      } else if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
          if (permission === 'denied') {
            setShowNotificationMessage(true);
          }
        });
      }
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
        {showNotificationMessage && (
          <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>알림 기능이 동작하지 않습니다. 브라우저 설정에서 알림 권한을 허용해주세요.</span>
              </div>
              <button
                onClick={() => setShowNotificationMessage(false)}
                className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
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
