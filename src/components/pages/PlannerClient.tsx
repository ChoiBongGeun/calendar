
'use client';

import { useMigrateTodosOnMount } from '@/hooks/useMigrateTodos';
import Calendar from '@/components/organisms/Calendar';
import DailyPlanner from '@/components/DailyPlanner';
import Card from '@/components/shared/Card';
import LayoutContainer from '@/layouts/LayoutContainer';

export default function PlannerClient() {
  useMigrateTodosOnMount();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <LayoutContainer>
        <Card variant="primary">
          <Calendar />
        </Card>
        <Card variant="secondary">
          <DailyPlanner />
        </Card>
      </LayoutContainer>
    </main>
  );
}
