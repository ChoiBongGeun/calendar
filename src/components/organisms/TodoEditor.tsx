'use client';

import { TodoItem } from '@/types/todo';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTodoStore } from '@/store/todo';
import { useTodoModalStore } from '@/store/todoModal';
import { notificationService } from '@/services/notification';

interface Props {
  todo: TodoItem;
  isAdding: boolean;
}

export default function TodoEditor({ todo, isAdding }: Props): JSX.Element {
  const { addTodo, updateTodo } = useTodoStore();
  const close = useTodoModalStore((state) => state.close);

  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const [time, setTime] = useState(todo.time || '');
  const [notification, setNotification] = useState(todo.notification || false);
  const [isPreview, setIsPreview] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (todo.content) {
      setIsPreview(true);
    }
  }, [todo]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        close();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTodo = {
      ...todo,
      title,
      content,
      time,
      notification,
      updatedAt: new Date(),
    };

    if (isAdding) {
      addTodo(updatedTodo);
    } else {
      updateTodo(todo.id, updatedTodo);
    }

    if (notification && time) {
      notificationService.scheduleNotification(updatedTodo);
    } else {
      notificationService.cancelNotification(todo.id);
    }

    close();
  };

  return (
      <div className="modal-overlay">
        <div ref={modalRef} className="modal-content w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {isAdding ? '새 할일' : '할일 수정'}
              </h2>
              <button
                  type="button"
                  onClick={close}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-2/3 space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    제목
                  </label>
                  <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input"
                      placeholder="할일 제목을 입력하세요"
                      required
                  />
                </div>

                <div className="flex items-end gap-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">시간</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="input w-32"
                    />
                  </div>

                  <div
                      className="flex items-center cursor-pointer h-10"
                      onClick={() => setNotification(!notification)}
                      title={notification ? "알림 해제" : "알림 설정"}
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-all duration-200 ${
                            notification
                                ? 'text-blue-500 dark:text-blue-400 scale-110'
                                : 'text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-110'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    내용
                  </label>
                  <button
                      type="button"
                      onClick={() => setIsPreview(!isPreview)}
                      className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {isPreview ? '편집' : '미리보기'}
                  </button>
                </div>

                {isPreview ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg min-h-[200px] border border-gray-200 dark:border-gray-700">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                      </ReactMarkdown>
                    </div>
                ) : (
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="input min-h-[200px]"
                        placeholder="마크다운 형식으로 작성할 수 있습니다."
                    />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={close} className="btn btn-secondary">
                취소
              </button>
              <button type="submit" className="btn btn-primary">
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
