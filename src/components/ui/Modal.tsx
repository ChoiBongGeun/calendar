import { ReactNode } from 'react';

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full">
        {children}
      </div>
    </div>
  );
}
