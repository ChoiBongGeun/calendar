'use client';

import { useTodoModalStore } from '@/store/todoModal';
import TodoEditor from './TodoEditor';

export default function TodoModal() {
    const { isOpen, currentTodo, isAdding } = useTodoModalStore();

    if (!isOpen || !currentTodo) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
            <TodoEditor
                todo={currentTodo}
                isAdding={isAdding}
            />
        </div>
    );
}
