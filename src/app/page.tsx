"use client";

import { RecoilRoot } from "recoil";
import DailyPlanner from '@/components/organisms/DailyPlanner';
import DatePicker from '@/components/organisms/Calendar';

export default function Home() {
  return (
    <RecoilRoot>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            해야 할일 관리
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-[400px] mx-auto lg:mx-0">
              <DatePicker />
            </div>
            <div className="flex-1">
              <DailyPlanner />
            </div>
          </div>
        </div>
      </main>
    </RecoilRoot>
  );
}
