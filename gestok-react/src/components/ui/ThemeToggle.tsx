import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Componente para alternar entre modo claro y oscuro
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
      aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
