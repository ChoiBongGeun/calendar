export interface Todo {
  id: number;
  title: string;
  content: string;
  done: boolean;
  author: string;
  time?: string;
  notification: boolean;
  createdAt: Date;
  updatedAt: Date;
  date: string;
}

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
  date: string;
  isNew?: boolean;
} 