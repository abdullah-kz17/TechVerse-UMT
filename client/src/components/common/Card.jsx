import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Card = ({ children, className = '' }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`rounded-2xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
            isDarkMode 
                ? 'bg-gray-800/80 border-gray-700' 
                : 'bg-white/80 border-white'
        } ${className}`}>
            {children}
        </div>
    );
};

export default Card; 