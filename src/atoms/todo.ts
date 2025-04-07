import { atom, selector, selectorFamily } from 'recoil';

export interface TodoItem {
  id: number;
  title: string;
  content: string;
  done: boolean;
  author: string;
  time?: string;
  notification?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const todosState = atom<Record<string, TodoItem[]>>({
  key: 'todosState',
  default: {},
});

export const selectedDateState = atom<string>({
  key: 'selectedDateState',
  default: new Date().toISOString().split('T')[0],
});

export const currentTodosSelector = selector<TodoItem[]>({
  key: 'currentTodosSelector',
  get: ({ get }) => {
    const selectedDate = get(selectedDateState);
    const todos = get(todosState);
    return todos[selectedDate] || [];
  },
  set: ({ set, get }, newValue) => {
    const selectedDate = get(selectedDateState);
    set(todosState, prev => ({
      ...prev,
      [selectedDate]: newValue as TodoItem[],
    }));
  },
});
selectorFamily<TodoItem | undefined, number>({
  key: 'todoByIdSelector',
  get: (id) => ({ get }) => {
    const todos = get(currentTodosSelector);
    return todos.find(todo => todo.id === id);
  },
});
selectorFamily<TodoItem, { title: string; time?: string; content?: string }>({
  key: 'addTodoSelector',
  get: (params) => ({ get }) => {
    get(currentTodosSelector);
    const newTodo: TodoItem = {
      id: Date.now(),
      title: params.title,
      content: params.content || '',
      done: false,
      author: '비회원',
      time: params.time,
      notification: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newTodo;
  },
  set: () => ({ set, get }, newValue) => {
    const todos = get(currentTodosSelector);
    set(currentTodosSelector, [...todos, newValue as TodoItem]);
  },
});
selectorFamily<TodoItem, { id: number; updates: Partial<TodoItem> }>({
  key: 'updateTodoSelector',
  get: (params) => ({ get }) => {
    const todos = get(currentTodosSelector);
    const todo = todos.find(t => t.id === params.id);
    if (!todo) throw new Error('Todo not found');
    return { ...todo, ...params.updates, updatedAt: new Date() };
  },
  set: (params) => ({ set, get }, newValue) => {
    const todos = get(currentTodosSelector);
    set(currentTodosSelector, todos.map(todo =>
        todo.id === params.id ? newValue as TodoItem : todo
    ));
  },
});
selectorFamily<void, number>({
  key: 'deleteTodoSelector',
  get: () => () => {},
  set: (id) => ({ set, get }) => {
    const todos = get(currentTodosSelector);
    set(currentTodosSelector, todos.filter(todo => todo.id !== id));
  },
});
