'use client';

import { useEffect } from 'react';
import { useTodoStore } from '@/store/todo';
import { useTodoInputStore } from '@/store/todoInput';
import TodoItemCard from '@/components/molecules/TodoItemCard';
import TodoInputForm from '@/components/molecules/TodoInputForm';

export default function DailyPlanner() {
  const { getCurrentTodos, setSelectedDate } = useTodoStore();
  const todos = getCurrentTodos();

  const resetInput = useTodoInputStore((state) => state.reset);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    resetInput();
  }, [setSelectedDate, resetInput]);

  return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">할일 목록</h2>
        </div>

        {/* 입력 폼 */}
        <TodoInputForm />

        <div className="space-y-4">
          {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                할일이 없습니다. 새로운 할일을 추가해보세요!
              </div>
          ) : (
              todos.map((todo) => (
                  <TodoItemCard key={todo.id} todo={todo} />
              ))
          )}
        </div>
      </div>
  );
}
