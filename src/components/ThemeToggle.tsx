
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
                 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 focus:ring-offset-white dark:focus:ring-offset-gray-900
                 transition-colors duration-200"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <SunIcon
          className="h-5 w-5"
          aria-hidden="true"
        />
      ) : (
        <MoonIcon
          className="h-5 w-5"
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default ThemeToggle; 