import { TodoItem } from '@/atoms/todo';

interface Props {
  todo: TodoItem;
  onToggleDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: TodoItem) => void;
}

export default function TodoItemCard({ todo, onToggleDone, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggleDone(todo.id)}
            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className={`text-lg font-medium ${todo.done ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {todo.title}
              </h3>
              {todo.time && (
                <div className="flex items-center space-x-1">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {todo.time}
                  </span>
                  {todo.notification && (
                    <span className="text-yellow-500">🔔</span>
                  )}
                </div>
              )}
            </div>
            {todo.content && (
              <p className={`mt-1 text-gray-600 ${todo.done ? 'line-through' : ''}`}>
                {todo.content}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
} 