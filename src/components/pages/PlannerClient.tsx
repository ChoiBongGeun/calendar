'use client';

import {useMigrateTodos} from '@/hooks/useMigrateTodos';
import Calendar from '@/components/organisms/Calendar';
import DailyPlanner from '@/components/organisms/DailyPlanner';
import Card from '@/components/shared/Card';

export default function PlannerClient() {
  useMigrateTodos();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        <Card variant="primary">
          <Calendar />
        </Card>
        <Card variant="secondary">
          <DailyPlanner />
        </Card>
      </div>
    </main>
  );
}
