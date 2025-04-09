import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  initializeTheme: () => void;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,

  // 로컬 스토리지 기반 초기화 + 다크모드 적용
  initializeTheme: () => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';

    // 실제 적용
    document.documentElement.classList.toggle('dark', isDark);
    set({ isDarkMode: isDark });
  },

  // 상태 + DOM + 저장소 전부 처리
  toggleDarkMode: () =>
      set((state) => {
        const newIsDark = !state.isDarkMode;
        document.documentElement.classList.toggle('dark', newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        return { isDarkMode: newIsDark };
      }),
}));
