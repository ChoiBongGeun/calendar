import { create } from 'zustand';
import { TodoItem } from '@/types/todo';

interface TodoModalState {
    isOpen: boolean;
    isAdding: boolean;
    currentTodo: TodoItem | null;
    open: (todo: TodoItem, isAdding: boolean) => void;
    close: () => void;
}

export const useTodoModalStore = create<TodoModalState>((set) => ({
    isOpen: false,
    isAdding: false,
    currentTodo: null,
    open: (todo, isAdding) => set({ isOpen: true, currentTodo: todo, isAdding }),
    close: () => set({ isOpen: false, currentTodo: null }),
}));
