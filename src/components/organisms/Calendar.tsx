'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/calendar.css';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function CustomCalendar() {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 w-full max-w-md transition-colors duration-300">
            <button
                onClick={() => setDate(new Date())}
                className="mb-4 px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition duration-200"
            >
                <CalendarDaysIcon className="h-5 w-5" />
            </button>

            <div className="w-full">
                <Calendar
                    onChange={(newDate) => {
                        if (newDate && !Array.isArray(newDate)) {
                            setDate(newDate);
                        }
                    }}
                    value={date}
                    formatDay={(locale, date) => String(date.getDate())}
                    prev2Label={null}
                    next2Label={null}
                    locale="ko-KR"
                    tileClassName={({ date: currentDate, view }) => {
                        if (view !== 'month') return;
                        const today = new Date();
                        const isToday =
                            currentDate.getDate() === today.getDate() &&
                            currentDate.getMonth() === today.getMonth() &&
                            currentDate.getFullYear() === today.getFullYear();
                        if (isToday) return 'custom-today';
                    }}
                />
            </div>
        </div>
    );
}
