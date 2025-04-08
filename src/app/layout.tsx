import RootLayout from '@/components/templates/RootLayout';

export const metadata = {
  title: '스케줄러',
  description: '일정을 관리하세요.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
