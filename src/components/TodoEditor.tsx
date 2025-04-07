import { useState } from 'react';
import { TodoItem } from '@/atoms/todo';

interface Props {
  todo: TodoItem;
  onSave: (content: string, time?: string, notification?: boolean) => void;
  onCancel: () => void;
  mode: 'insert' | 'edit';
}

export default function TodoEditor({ todo, onSave, onCancel, mode }: Props) {
  const [content, setContent] = useState(todo.content);
  const [time, setTime] = useState(todo.time || '');
  const [notification, setNotification] = useState(todo.notification || false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'insert' ? '할일 삽입' : '할일 수정'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              value={todo.title}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
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
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="notification"
              checked={notification}
              onChange={(e) => setNotification(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="notification" className="ml-2 text-sm text-gray-700">
              알림 설정
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={() => onSave(content, time, notification)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {mode === 'insert' ? '삽입' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
} 