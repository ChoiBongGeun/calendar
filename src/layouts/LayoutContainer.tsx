
interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutContainer({ children }: LayoutProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      {children}
    </div>
  );
}
