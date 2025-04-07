import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { TodoItem, currentTodosSelector, addTodoSelector, updateTodoSelector, deleteTodoSelector } from '@/atoms/todo';
import { notificationService } from '@/services/notification';
import TodoItemCard from './TodoItemCard';
import TodoEditor from './TodoEditor';

export default function DailyPlanner() {
  const [todos, setTodos] = useRecoilState(currentTodosSelector);
  const [input, setInput] = useState('');
  const [time, setTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  const handleAddTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      title: input.trim(),
      time: time || undefined,
      content: ''
    };
    setTodos(prev => [...prev, {
      id: Date.now(),
      ...newTodo,
      done: false,
      author: '사용자',
      notification: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
    setInput('');
    setTime('');
    setSelectedTodo({
      id: Date.now(),
      ...newTodo,
      done: false,
      author: '사용자',
      notification: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setIsAdding(true);
  };

  const handleToggleDone = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    notificationService.cancelNotification(id);
  };

  const startEdit = (todo: TodoItem) => {
    setSelectedTodo(todo);
    setIsEditing(true);
  };

  const saveEdit = (content: string, time?: string, notification?: boolean) => {
    if (!selectedTodo) return;
    const updatedTodo = {
      ...selectedTodo,
      content,
      time,
      notification,
      updatedAt: new Date(),
    };
    
    setTodos(prev =>
      prev.map(todo =>
        todo.id === selectedTodo.id ? updatedTodo : todo
      )
    );

    // 알림 설정이 변경된 경우 알림 스케줄링 업데이트
    if (notification && time) {
      notificationService.scheduleNotification(updatedTodo);
    } else {
      notificationService.cancelNotification(selectedTodo.id);
    }

    setIsEditing(false);
    setIsAdding(false);
    setSelectedTodo(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할일 제목"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            추가
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {todos.map(todo => (
          <TodoItemCard
            key={todo.id}
            todo={todo}
            onToggleDone={handleToggleDone}
            onDelete={handleDeleteTodo}
            onEdit={startEdit}
          />
        ))}
      </div>

      {(isEditing || isAdding) && selectedTodo && (
        <TodoEditor
          todo={selectedTodo}
          onSave={saveEdit}
          onCancel={() => {
            setIsEditing(false);
            setIsAdding(false);
            setSelectedTodo(null);
          }}
          mode={isAdding ? 'insert' : 'edit'}
        />
      )}
    </div>
  );
} 