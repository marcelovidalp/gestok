import { createTheme } from '@mui/material/styles';
import { useThemeStore } from '../stores/themeStore';
import { useMemo } from 'react';

/**
 * Hook personalizado para crear el tema de Material UI
 * que se sincroniza con el modo oscuro de la aplicación
 */
export const useMaterialTheme = () => {
  const { isDarkMode } = useThemeStore();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: isDarkMode ? '#3b82f6' : '#2f6f9f',
            dark: isDarkMode ? '#2563eb' : '#254e6f',
          },
          background: {
            default: isDarkMode ? '#111827' : '#f6f7f9',
            paper: isDarkMode ? '#1f2937' : '#ffffff',
          },
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
        },
      }),
    [isDarkMode]
  );

  return theme;
};
