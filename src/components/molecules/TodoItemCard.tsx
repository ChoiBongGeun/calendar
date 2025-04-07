import { TodoItem } from '@/atoms/todo';

interface Props {
  todo: TodoItem;
  onToggleDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: TodoItem) => void;
}

export default function TodoItemCard({ todo, onToggleDone, onDelete, onEdit }: Props) {
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
              {todo.notification && (
                <span className="notification-icon" title="알림 설정됨">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </span>
              )}
            </div>
            {todo.content && (
              <p className={`mt-1 text-sm ${todo.done ? 'text-gray-400' : 'text-gray-600'}`}>
                {todo.content}
              </p>
            )}
            {todo.time && (
              <span className="time-tag mt-2 inline-block">
                {todo.time}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="btn btn-secondary p-2"
            title="수정"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="btn btn-danger p-2"
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