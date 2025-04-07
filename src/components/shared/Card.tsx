
interface CardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function Card({ children, variant = 'primary' }: CardProps) {
  const bg = variant === 'primary' ? 'bg-white dark:bg-gray-700' : 'bg-white dark:bg-gray-700';
  const shadow = variant === 'primary' ? 'shadow-lg' : 'shadow-md';

  return (
    <section className={`rounded-2xl ${shadow} ${bg} p-4 md:p-6 lg:p-8 transition-colors duration-500`}>
      {children}
    </section>
  );
}
