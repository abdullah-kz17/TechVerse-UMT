import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
    const { isDarkMode } = useTheme();

    return (
        <footer className={`py-8 transition-all duration-300 ${
            isDarkMode 
                ? 'bg-gray-800/80 border-t border-gray-700' 
                : 'bg-white/80 border-t border-gray-200'
        } backdrop-blur-sm`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            About UMT Lost & Found
                        </h3>
                        <p className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            A platform dedicated to helping the UMT community recover lost items and return found items to their rightful owners.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/lost-items-post" className={`text-sm hover:text-blue-500 transition-colors ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    Lost Items
                                </Link>
                            </li>
                            <li>
                                <Link to="/found-items-post" className={`text-sm hover:text-blue-500 transition-colors ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    Found Items
                                </Link>
                            </li>
                            <li>
                                <Link to="/create-post" className={`text-sm hover:text-blue-500 transition-colors ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    Create Post
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Contact
                        </h3>
                        <ul className="space-y-2">
                            <li className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Email: support@umt.edu.pk
                            </li>
                            <li className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Phone: +92 42 111 000 123
                            </li>
                            <li className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Address: UMT, Johar Town, Lahore
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className={`mt-8 pt-8 border-t ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                    <p className={`text-center text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        © {new Date().getFullYear()} UMT Lost & Found. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
