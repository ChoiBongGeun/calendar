import { create } from 'zustand';
import { TodoItem } from '@/types/todo';

interface TodoState {
  todos: Record<string, TodoItem[]>;
  selectedDate: string;
  setTodos: (todos: Record<string, TodoItem[]>) => void;
  setSelectedDate: (date: string) => void;
  getCurrentTodos: () => TodoItem[];
  addTodo: (todo: TodoItem) => void;
  updateTodo: (id: number, todo: Partial<TodoItem>) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: {},
  selectedDate: new Date().toISOString().split('T')[0],
  setTodos: (todos) => set({ todos }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  getCurrentTodos: () => {
    const { todos, selectedDate } = get();
    return todos[selectedDate] || [];
  },
  addTodo: (todo) => set((state) => ({
    todos: {
      ...state.todos,
      [todo.date]: [...(state.todos[todo.date] || []), todo],
    },
  })),
  updateTodo: (id, updatedTodo) => set((state) => ({
    todos: Object.entries(state.todos).reduce((acc, [date, todos]) => ({
      ...acc,
      [date]: todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      ),
    }), {}),
  })),
  deleteTodo: (id) => set((state) => ({
    todos: Object.entries(state.todos).reduce((acc, [date, todos]) => ({
      ...acc,
      [date]: todos.filter((todo) => todo.id !== id),
    }), {}),
  })),
})); 