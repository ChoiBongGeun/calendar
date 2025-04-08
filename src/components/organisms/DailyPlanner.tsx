'use client';

import { useState } from 'react';
import { useTodoStore } from '@/store/todo';
import { TodoItem } from '@/types/todo';
import { notificationService } from '@/services/notification';
import TodoItemCard from '@/components/molecules/TodoItemCard';
import TodoEditor from './TodoEditor';

export default function DailyPlanner(): JSX.Element {
  const { getCurrentTodos, updateTodo, deleteTodo, addTodo } = useTodoStore();
  const todos = getCurrentTodos();
  const [input, setInput] = useState('');
  const [time, setTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddTodo = (): void => {
    const newTodo: TodoItem = {
      id: Date.now(),
      title: input.trim() || '',
      content: '',
      time: time || undefined,
      done: false,
      notification: false,
      date: selectedDate,
      author: '사용자',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSelectedTodo(newTodo);
    setIsAdding(true);
    setInput('');
    setTime('');
  };

  const handleToggleDone = (id: number): void => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      updateTodo(id, { done: !todo.done });
    }
  };

  const handleDeleteTodo = (id: number): void => {
    deleteTodo(id);
    notificationService.cancelNotification(id);
  };

  const startEdit = (todo: TodoItem): void => {
    setSelectedTodo(todo);
    setIsEditing(true);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">할일 목록</h2>

        {/* 데스크톱에서만 보이는 입력 폼 */}
        <div className="hidden lg:flex gap-2 items-center mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할일 제목을 입력하세요"
            className="flex-1 lg:px-4 lg:py-2 lg:border lg:border-gray-300 lg:rounded-md lg:bg-white lg:text-gray-900 lg:placeholder-gray-400"
          />
          <div className="relative">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-48 lg:pl-3 lg:pr-3 lg:py-2 lg:border lg:border-gray-300 lg:rounded-md lg:bg-white lg:text-gray-900 lg:text-left lg:appearance-none"
              lang="ko"
            />
          </div>
          <button
            onClick={handleAddTodo}
            className="btn btn-primary p-2"
            title="할일 추가"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>

        {/* 모바일에서만 보이는 추가 버튼 */}
        <div className="lg:hidden flex justify-end mb-6">
          <button
            onClick={handleAddTodo}
            className="btn btn-primary p-2"
            title="할일 추가"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              할일이 없습니다. 새로운 할일을 추가해보세요!
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItemCard
                key={todo.id}
                todo={todo}
                onToggleDone={handleToggleDone}
                onDelete={handleDeleteTodo}
                onEdit={startEdit}
              />
            ))
          )}
        </div>
      </div>

      {(isEditing || isAdding) && selectedTodo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <TodoEditor
            todo={selectedTodo}
            onClose={() => {
              setIsEditing(false);
              setIsAdding(false);
              setSelectedTodo(null);
            }}
          />
        </div>
      )}
    </>
  );
} 