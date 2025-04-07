'use client';

interface TodoInputFormProps {
  input: string;
  time: string;
  onInputChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onAdd: () => void;
}

export default function TodoInputForm({
  input,
  time,
  onInputChange,
  onTimeChange,
  onAdd,
}: TodoInputFormProps) {
  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="할일 제목"
          className="border flex-1 px-4 py-2 rounded-lg"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />
        <button
          onClick={onAdd}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-colors"
        >
          추가
        </button>
      </div>
    </div>
  );
} 