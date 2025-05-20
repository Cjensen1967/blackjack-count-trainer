import { useState, useEffect } from 'react';

/**
 * Represents the available theme options
 */
type Theme = 'light' | 'dark';

/**
 * Return type for the useTheme hook
 */
interface UseThemeReturn {
  /** Current active theme ('light' or 'dark') */
  theme: Theme;
  
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
}

/**
 * Custom hook for managing theme switching functionality
 * 
 * This hook provides:
 * - Theme state management (light/dark)
 * - Persistent theme storage in localStorage
 * - System preference detection for initial theme
 * - Automatic application of theme classes to the document
 * 
 * The theme selection follows this priority:
 * 1. User's saved preference in localStorage
 * 2. System preference (prefers-color-scheme media query)
 * 3. Light theme as fallback
 * 
 * @returns An object containing the current theme and a function to toggle it
 */
export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};
