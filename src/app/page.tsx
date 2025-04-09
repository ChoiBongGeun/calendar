"use client";

import DailyPlanner from '@/components/organisms/DailyPlanner';
import DatePicker from '@/components/organisms/Calendar';
import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import DarkModeToggle from "@/components/molecules/DarkModeToggle";

export default function Home() {
  const { initializeTheme } = useThemeStore();
  const [showNotificationMessage, setShowNotificationMessage] = useState(false);

  useEffect(() => {
    initializeTheme();

    // 알림 권한 요청
    if ('Notification' in window) {
      if (Notification.permission === 'denied') {
        setShowNotificationMessage(true);
      } else if (Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'denied') {
            setShowNotificationMessage(true);
          }
        });
      }
    }
  }, [initializeTheme]);

  return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {showNotificationMessage && (
              <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="..." clipRule="evenodd" />
                    </svg>
                    <span>알림 기능이 동작하지 않습니다. 브라우저 설정에서 알림 권한을 허용해주세요.</span>
                  </div>
                  <button
                      onClick={() => setShowNotificationMessage(false)}
                      className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="..." clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
          )}

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              해야 할일 관리
            </h1>
            <DarkModeToggle />
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
