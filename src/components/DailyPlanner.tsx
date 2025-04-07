'use client';

import { useReducer } from 'react';
import { useRecoilState } from 'recoil';
import { TodoItem, currentTodosSelector } from '@/atoms/todo';
import { notificationService } from '@/services/notification';
import TodoItemCard from './TodoItemCard';
import TodoEditor from './TodoEditor';
import TodoInputForm from './TodoInputForm';

type Mode = 'view' | 'edit' | 'add';

interface PlannerState {
  mode: Mode;
  selectedTodo: TodoItem | null;
  input: string;
  time: string;
}

type PlannerAction =
  | { type: 'SET_MODE'; payload: Mode }
  | { type: 'SET_SELECTED_TODO'; payload: TodoItem | null }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_TIME'; payload: string }
  | { type: 'RESET_FORM' };

const initialState: PlannerState = {
  mode: 'view',
  selectedTodo: null,
  input: '',
  time: '',
};

function plannerReducer(state: PlannerState, action: PlannerAction): PlannerState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_SELECTED_TODO':
      return { ...state, selectedTodo: action.payload };
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'SET_TIME':
      return { ...state, time: action.payload };
    case 'RESET_FORM':
      return { ...state, input: '', time: '' };
    default:
      return state;
  }
}

export default function DailyPlanner() {
  const [todos, setTodos] = useRecoilState(currentTodosSelector);
  const [state, dispatch] = useReducer(plannerReducer, initialState);

  const handleAddTodo = () => {
    if (!state.input.trim()) return;
    
    const newTodo: TodoItem = {
      id: Date.now(),
      title: state.input.trim(),
      time: state.time || undefined,
      content: '',
      done: false,
      author: '사용자',
      notification: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos(prev => [...prev, newTodo]);
    dispatch({ type: 'SET_SELECTED_TODO', payload: newTodo });
    dispatch({ type: 'SET_MODE', payload: 'add' });
    dispatch({ type: 'RESET_FORM' });
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
    dispatch({ type: 'SET_SELECTED_TODO', payload: todo });
    dispatch({ type: 'SET_MODE', payload: 'edit' });
  };

  const saveEdit = (content: string, time?: string, notification?: boolean) => {
    if (!state.selectedTodo) return;
    
    const updatedTodo = {
      ...state.selectedTodo,
      content,
      time,
      notification,
      updatedAt: new Date(),
    };
    
    setTodos(prev =>
      prev.map(todo =>
        todo.id === state.selectedTodo?.id ? updatedTodo : todo
      )
    );

    if (notification && time) {
      notificationService.scheduleNotification(updatedTodo);
    } else {
      notificationService.cancelNotification(state.selectedTodo.id);
    }

    dispatch({ type: 'SET_MODE', payload: 'view' });
    dispatch({ type: 'SET_SELECTED_TODO', payload: null });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <TodoInputForm
        input={state.input}
        time={state.time}
        onInputChange={(value: string) => dispatch({ type: 'SET_INPUT', payload: value })}
        onTimeChange={(value: string) => dispatch({ type: 'SET_TIME', payload: value })}
        onAdd={handleAddTodo}
      />

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

      {(state.mode === 'edit' || state.mode === 'add') && state.selectedTodo && (
        <TodoEditor
          todo={state.selectedTodo}
          onSave={saveEdit}
          onCancel={() => {
            dispatch({ type: 'SET_MODE', payload: 'view' });
            dispatch({ type: 'SET_SELECTED_TODO', payload: null });
          }}
          mode={state.mode === 'add' ? 'insert' : 'edit'}
        />
      )}
    </div>
  );
} 