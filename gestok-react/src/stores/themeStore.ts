import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

/**
 * Store para gestionar el tema (claro/oscuro) de la aplicación
 * Usa Zustand con persistencia en localStorage
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      
      /**
       * Alterna entre modo claro y oscuro
       */
      toggleTheme: () => set((state) => {
        const newIsDarkMode = !state.isDarkMode;
        // Actualizar clase en el HTML
        if (newIsDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDarkMode: newIsDarkMode };
      }),
      
      /**
       * Establece el tema directamente
       */
      setTheme: (isDark: boolean) => set(() => {
        // Actualizar clase en el HTML
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDarkMode: isDark };
      }),
    }),
    {
      name: 'gestok-theme',
      // Restaurar tema al cargar
      onRehydrateStorage: () => (state) => {
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }
  )
);
