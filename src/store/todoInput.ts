import { create } from 'zustand';

interface TodoInputState {
    input: string;
    time: string;
    setInput: (value: string) => void;
    setTime: (value: string) => void;
    reset: () => void;
}

export const useTodoInputStore = create<TodoInputState>((set) => ({
    input: '',
    time: '',
    setInput: (value) => set({ input: value }),
    setTime: (value) => set({ time: value }),
    reset: () => set({ input: '', time: '' }),
}));
