'use client';

import { useThemeStore } from '@/store/themeStore';
import { MoonIcon } from '@/components/ui/icons/MoonIcon';
import { SunIcon } from '@/components/ui/icons/SunIcon';

export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useThemeStore();

    return (
        <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-sm shadow hover:shadow-md transition-all duration-200"
        >
            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            {isDarkMode ? 'Light' : 'Dark'}
        </button>
    );
}
