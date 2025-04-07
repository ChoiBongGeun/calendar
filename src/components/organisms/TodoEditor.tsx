import { useState } from 'react';
import { TodoItem } from '@/atoms/todo';

interface Props {
  todo: TodoItem;
  onSave: (content: {
    date: string;
    notification: boolean;
    createdAt: Date;
    author: string;
    id: number;
    time: string | undefined;
    title: string;
    done: boolean;
    content: string;
    updatedAt: Date
  }, time?: string, notification?: boolean) => void;
  onCancel: () => void;
  mode: 'insert' | 'edit';
}

export default function TodoEditor({ todo, onSave, onCancel, mode }: Props) {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content || '');
  const [time, setTime] = useState(todo.time || '');
  const [notification, setNotification] = useState(todo.notification || false);

  const handleSave = () => {
    const updatedTodo = {
      ...todo,
      title,
      content,
      time: time || undefined,
      notification,
    };
    onSave(updatedTodo);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {mode === 'insert' ? '할일 삽입' : '할일 수정'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input w-full"
              placeholder="할일 제목을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input w-full h-24"
              placeholder="할일 내용을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              시간
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input w-32"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="notification"
              checked={notification}
              onChange={(e) => setNotification(e.target.checked)}
              className="checkbox"
            />
            <label htmlFor="notification" className="ml-2 text-sm text-gray-700">
              알림 설정
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary"
          >
            {mode === 'insert' ? '삽입' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
} 