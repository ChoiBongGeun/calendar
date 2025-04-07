import { InputHTMLAttributes } from 'react';

export default function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      {...props}
      className={`form-checkbox w-5 h-5 text-blue-600 bg-white border-gray-300 rounded
        focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 ${props.className || ''}`}
    />
  );
}
