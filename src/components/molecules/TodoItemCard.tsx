'use client';

import { TodoItem } from '@/types/todo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  todo: TodoItem;
  onToggleDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: TodoItem) => void;
}

export default function TodoItemCard({ todo, onToggleDone, onDelete, onEdit }: Props): JSX.Element {
  return (
    <div className="todo-item bg-white dark:bg-gray-700 rounded-xl p-4 shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggleDone(todo.id)}
            className="checkbox mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className={`text-lg font-medium ${todo.done ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                {todo.title}
              </h3>
              {todo.time && (
                <div className="flex items-center gap-2">
                  <span className="time-tag">
                    {todo.time}
                  </span>
                  {todo.notification && (
                    <span className="notification-icon" title="알림 설정됨">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </span>
                  )}
                </div>
              )}
            </div>
            {todo.content && (
              <div className={`mt-1 text-sm ${todo.done ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
                <article className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props} />,
                      code: ({node, ...props}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded mb-4 overflow-x-auto" {...props} />
                    }}
                  >
                    {todo.content}
                  </ReactMarkdown>
                </article>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            title="수정"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            title="삭제"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 