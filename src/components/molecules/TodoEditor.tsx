'use client';

import { useState } from 'react';
import { TodoItem } from '@/atoms/todo';
import '@/styles/todo.css';

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
      <div className="modal-content">
        <h2>
          {mode === 'insert' ? '할일 삽입' : '할일 수정'}
        </h2>
        
        <div className="input-group">
          <div>
            <label htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="할일 제목을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="할일 내용을 입력하세요 (마크다운 지원)"
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="time">
                시간
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="notification"
                checked={notification}
                onChange={(e) => setNotification(e.target.checked)}
              />
              <label htmlFor="notification" className="checkbox-label">
                알림 설정
              </label>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button
            onClick={onCancel}
            className="cancel"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="save"
          >
            {mode === 'insert' ? '삽입' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
} 