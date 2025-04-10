'use client';

import { useTodoInputStore } from '@/store/todoInput';
import { useTodoModalStore } from '@/store/todoModal';
import { useTodoStore } from '@/store/todo';
import { TodoItem } from '@/types/todo';

export default function TodoInputForm() {
  const input = useTodoInputStore((state) => state.input);
  const time = useTodoInputStore((state) => state.time);
  const setInput = useTodoInputStore((state) => state.setInput);
  const setTime = useTodoInputStore((state) => state.setTime);
  const reset = useTodoInputStore((state) => state.reset);
  const { selectedDate } = useTodoStore();

  const handleAdd = () => {
    const newTodo: TodoItem = {
      id: Date.now(),
      title: input.trim() || '',
      content: '',
      done: false,
      author: '비회원',
      date: selectedDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      notification: false,
      time: time || undefined,
    };

    useTodoModalStore.getState().open(newTodo, true);
    reset();
  };

  return (
      <div className="mb-4">
        <div className="flex gap-2">
          <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="할일 제목"
              className="border flex-1 px-4 py-2 rounded-lg"
          />
          <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border px-4 py-2 rounded-lg"
          />
          <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-colors"
          >
            추가
          </button>
        </div>
      </div>
  );
}
