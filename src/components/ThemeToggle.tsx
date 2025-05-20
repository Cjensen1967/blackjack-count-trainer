import React from 'react';
import { useTheme } from '../hooks/useTheme';

/**
 * Props for the ThemeToggle component
 */
interface ThemeToggleProps {
  /**
   * Additional CSS class names to apply to the toggle button
   * @default ''
   */
  className?: string;
}

/**
 * Component for toggling between light and dark themes
 * 
 * This component renders a button with appropriate icons for switching between
 * light and dark themes. It uses the useTheme hook to manage theme state and
 * persistence.
 * 
 * Features:
 * - Displays a sun icon when in dark mode (clicking switches to light mode)
 * - Displays a moon icon when in light mode (clicking switches to dark mode)
 * - Includes appropriate ARIA labels for accessibility
 * - Applies theme-specific styling
 * 
 * @param props - The component props
 * @returns A React component for toggling the theme
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${isDark ? 'dark' : 'light'} ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        // Sun icon for dark mode (switch to light)
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        // Moon icon for light mode (switch to dark)
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
