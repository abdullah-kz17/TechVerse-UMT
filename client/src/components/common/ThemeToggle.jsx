import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg transition-all duration-300
                     hover:bg-gray-100 dark:hover:bg-gray-800
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     text-gray-600 dark:text-gray-300"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <div className="relative w-6 h-6">
                <FiSun
                    className={`absolute w-6 h-6 transition-all duration-300 transform
                              ${isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
                              text-yellow-500`}
                />
                <FiMoon
                    className={`absolute w-6 h-6 transition-all duration-300 transform
                              ${isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
                              text-blue-400`}
                />
            </div>
        </button>
    );
};

export default ThemeToggle; 