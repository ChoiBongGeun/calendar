import { useEffect, useRef } from 'react';
import { useTodoStore } from '@/store/todo';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function useMigrateTodos(): void {
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const lastMigratedDate = useRef(getToday());

  useEffect(() => {
    const interval = setInterval(() => {
      const today = getToday();

      if (lastMigratedDate.current !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const yesterdayTodos = todos[yesterday] || [];
        const unfinishedTodos = yesterdayTodos.filter((todo) => !todo.done);

        if (unfinishedTodos.length > 0) {
          const newTodos = {
            ...todos,
            [today]: [...(todos[today] || []), ...unfinishedTodos],
            [yesterday]: yesterdayTodos,
          };
          setTodos(newTodos);
        }

        lastMigratedDate.current = today;
      }
    }, 1000 * 60); // 1분마다 체크

    return () => clearInterval(interval);
  }, [todos, setTodos]);
}
