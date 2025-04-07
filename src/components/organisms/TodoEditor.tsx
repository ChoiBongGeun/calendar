import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TodoItem } from '@/atoms/todo';

interface Props {
  todo: TodoItem;
  onSave: (todo: TodoItem) => void;
  onCancel: () => void;
  mode: 'insert' | 'edit';
}

export default function TodoEditor({ todo, onSave, onCancel, mode }: Props) {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content || '');
  const [time, setTime] = useState(todo.time || '');
  const [notification, setNotification] = useState(todo.notification || false);
  const [isPreview, setIsPreview] = useState(false);

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
      <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          {mode === 'insert' ? '할일 삽입' : '할일 수정'}
        </h2>
        
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="할일 제목을 입력하세요"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-40">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  시간
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center lg:items-end">
                <div className="flex items-center h-10">
                  <input
                    type="checkbox"
                    id="notification"
                    checked={notification}
                    onChange={(e) => setNotification(e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                  <label htmlFor="notification" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    알림 설정
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                내용
              </label>
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {isPreview ? '편집' : '미리보기'}
              </button>
            </div>
            {isPreview ? (
              <div className="prose dark:prose-invert max-w-none p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || '내용이 없습니다.'}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                placeholder="할일 내용을 마크다운 형식으로 입력하세요"
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {mode === 'insert' ? '삽입' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
} 