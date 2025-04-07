'use client';

import { useRecoilState } from 'recoil';
import { selectedDateState } from '@/atoms/todo';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Value } from 'react-calendar';

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      const formattedDate = format(value, 'yyyy-MM-dd');
      setSelectedDate(formattedDate);
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    
    const today = new Date();
    const isToday = format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
    const isSelected = format(date, 'yyyy-MM-dd') === selectedDate;
    
    return [
      'p-2 rounded-lg transition-all duration-200 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100',
      isToday ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 font-bold' : '',
      isSelected ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold shadow-lg' : 'hover:bg-gray-50',
      'border border-transparent',
      isToday ? 'border-yellow-200' : '',
      isSelected ? 'border-blue-600' : '',
    ].join(' ');
  };

  const formatMonthYear = (locale: string | undefined, date: Date) => {
    return format(date, 'yyyy년 M월', { locale: ko });
  };

  const formatDay = (locale: string | undefined, date: Date) => {
    return format(date, 'd', { locale: ko });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <Calendar
        onChange={handleDateChange}
        value={parseISO(selectedDate)}
        locale="ko"
        formatMonthYear={formatMonthYear}
        formatDay={formatDay}
        tileClassName={tileClassName}
        className="border-none"
        minDetail="month"
        next2Label={null}
        prev2Label={null}
        navigationLabel={({ date }) => (
          <span className="text-lg font-semibold text-gray-800">
            {format(date, 'yyyy년 M월', { locale: ko })}
          </span>
        )}
      />
    </div>
  );
} 