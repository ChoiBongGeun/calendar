
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { migrateUndoneTodosToToday, todoListState } from '@/atoms/todo';

export function useMigrateTodosOnMount() {
  const [todos, setTodos] = useRecoilState(todoListState);

  useEffect(() => {
    const updated = migrateUndoneTodosToToday(todos);
    if (updated.length > todos.length) {
      setTodos(updated);
    }
  }, []);
}
