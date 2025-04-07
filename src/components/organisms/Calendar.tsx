
'use client';

import { useRecoilState } from 'recoil';
import { selectedDateState } from '@/atoms/todo';
import { useMemo } from 'react';

const getMonthDays = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const days = useMemo(() => getMonthDays(year, month), [year, month]);

  const isToday = (d: Date) => d.toDateString() === today.toDateString();
  const isSelected = (d: Date) => d.toISOString().split('T')[0] === selectedDate;

  const handleSelect = (d: Date) => {
    const formatted = d.toISOString().split('T')[0];
    setSelectedDate(formatted);
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 transition-colors duration-500">
      <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">
        {year}년 {month + 1}월
      </h2>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {['일', '월', '화', '수', '목', '금', '토'].map((label, i) => (
          <div key={i} className="font-medium text-gray-500 dark:text-gray-300">
            {label}
          </div>
        ))}

        {Array(days[0].getDay()).fill(null).map((_, i) => (
          <div key={`pad-${i}`} className="" />
        ))}

        {days.map((d) => {
          const isTodayClass = isToday(d) ? 'border border-blue-500 text-blue-600 dark:text-blue-300' : '';
          const isSelectedClass = isSelected(d) ? 'bg-blue-500 text-white font-bold' : '';
          const defaultClass = 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600';

          return (
            <button
              key={d.toISOString()}
              onClick={() => handleSelect(d)}
              className={`rounded-lg py-1 transition-all text-sm ${isSelectedClass || isTodayClass || defaultClass}`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
