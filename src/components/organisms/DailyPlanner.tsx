'use client';

import { useEffect } from 'react';
import { useTodoStore } from '@/store/todo';
import { useTodoInputStore } from '@/store/todoInput';
import TodoItemCard from '@/components/molecules/TodoItemCard';
import TodoInputForm from '@/components/molecules/TodoInputForm';

export default function DailyPlanner() {
  const { getCurrentTodos, setSelectedDate, selectedDate } = useTodoStore();
  const todos = getCurrentTodos();

  const resetInput = useTodoInputStore((state) => state.reset);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
    resetInput();
  }, [setSelectedDate, resetInput]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return `${year}년 ${month}월 ${day}일`;
  };

  // 선택된 날짜의 할일만 필터링
  const filteredTodos = todos.filter(todo => todo.date === selectedDate);

  return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {formatDate(selectedDate)} 할일 목록
          </h2>
        </div>

        {/* 입력 폼 */}
        <TodoInputForm />

        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                할일이 없습니다. 새로운 할일을 추가해보세요!
              </div>
          ) : (
              filteredTodos.map((todo) => (
                  <TodoItemCard key={todo.id} todo={todo} />
              ))
          )}
        </div>
      </div>
  );
}
