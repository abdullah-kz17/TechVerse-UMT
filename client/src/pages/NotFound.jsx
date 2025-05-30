import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-purple-700 dark:text-purple-300 px-4 transition-colors duration-300">
            <FaExclamationTriangle className="text-6xl text-purple-500 dark:text-purple-400 mb-4 animate-bounce" />
            <h1 className="text-6xl font-extrabold mb-3">404</h1>
            <p className="text-lg text-center mb-6 max-w-md">
                Oops! The page you're looking for doesn’t exist or has been moved.
            </p>
            <Link
                to="/"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200"
            >
                Go to Home
            </Link>
        </div>
    );
}