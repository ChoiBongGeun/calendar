import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { TodoItem, currentTodosSelector, addTodoSelector, updateTodoSelector, deleteTodoSelector } from '@/atoms/todo';
import { notificationService } from '@/services/notification';
import TodoItemCard from '@/components/molecules/TodoItemCard';
import TodoEditor from './TodoEditor';

export default function DailyPlanner() {
  const [todos, setTodos] = useRecoilState(currentTodosSelector);
  const [input, setInput] = useState('');
  const [time, setTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddTodo = () => {
    const newTodo: TodoItem = {
      id: Date.now(),
      title: input.trim() || '',
      content: '',
      time: time || undefined,
      done: false,
      notification: false,
      date: selectedDate,
    };

    if (window.innerWidth <= 1024) {
      // 모바일에서는 바로 편집 모달 열기
      setSelectedTodo(newTodo);
      setIsAdding(true);
    } else if (input.trim()) {
      // 데스크톱에서는 입력된 제목이 있을 때만 추가
      setTodos(prev => [...prev, newTodo]);
      setInput('');
      setTime('');
    }
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

  const saveEdit = (updatedTodo: TodoItem) => {
    if (isAdding) {
      setTodos(prev => [...prev.filter(todo => todo.id !== updatedTodo.id), updatedTodo]);
    } else {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    }

    // 알림 설정이 변경된 경우 알림 스케줄링 업데이트
    if (updatedTodo.notification && updatedTodo.time) {
      notificationService.scheduleNotification(updatedTodo);
    } else {
      notificationService.cancelNotification(updatedTodo.id);
    }

    setIsEditing(false);
    setIsAdding(false);
    setSelectedTodo(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">할일 목록</h2>
      
      {/* 데스크톱에서만 보이는 입력 폼 */}
      <div className="hidden lg:flex gap-2 items-center mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할일 제목을 입력하세요"
          className="input flex-1"
        />
        <div className="relative">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input w-32"
          />
        </div>
        <button
          onClick={handleAddTodo}
          className="btn btn-primary p-2"
          title="할일 추가"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            할일이 없습니다. 새로운 할일을 추가해보세요!
          </div>
        ) : (
          todos.map(todo => (
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