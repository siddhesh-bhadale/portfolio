import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from '@/context/ThemeContext';

/** Reads the theme, and fails loudly if used outside the provider. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>.');
  }

  return context;
}
