import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { moveUnfinishedTodosToNextDay, todosState } from '@/store/todo';

export function useMigrateTodosOnMount(): void {
  const setTodos = useSetRecoilState(todosState);
  const updatedTodos = useRecoilValue(moveUnfinishedTodosToNextDay);

  useEffect(() => {
    setTodos(updatedTodos);
  }, [updatedTodos, setTodos]);
}
