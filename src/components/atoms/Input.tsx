import { InputHTMLAttributes } from 'react';

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`px-3 py-2 border rounded-lg shadow-sm text-sm 
        border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${props.className || ''}`}
    />
  );
}
