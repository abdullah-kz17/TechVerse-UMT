import React, { useState } from 'react';
import {
    User,
    LogOut,
    LogIn,
    Menu,
    X,
    Search,
    Plus,
    LayoutDashboard,
    MapPin,
    Eye
} from 'lucide-react';
import {Link, NavLink, useNavigate, useLocation} from 'react-router-dom';
import {useAuth} from "../../context/AuthContext.jsx";
import MessageNotification from '../chat/MessageNotification';
import ThemeToggle from '../common/ThemeToggle';
import { useDispatch } from "react-redux";

import { FiMenu, FiX, FiUser, FiLogOut, FiMessageSquare } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
    const {user, isLoggedIn, logout} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dashboardLink = user?.role === 'admin' ? '/admin-dashboard' : '/dashboard';
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode, toggleTheme } = useTheme();
    const dispatch = useDispatch();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleNavigation = (path) => {
        navigate(path);
        closeMenu();
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
        } border-b shadow-sm`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <Link to='/' className={`text-xl font-bold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            } bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent transition-all duration-200`}>
                                UMT Lost & Found
                            </Link>
                            <p className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            } -mt-1 transition-colors duration-200`}>Campus Recovery Portal</p>
                        </div>
                        <div className="sm:hidden">
                            <h1 className={`text-lg font-bold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            } bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent transition-all duration-200`}>
                                UMT L&F
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        <NavLink
                            to="/lost-items"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                }`
                            }
                        >
                            <MapPin className="w-4 h-4" />
                            <span className={`${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>Lost Items</span>
                        </NavLink>

                        <NavLink
                            to="/found-items"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                }`
                            }
                        >
                            <Eye className="w-4 h-4" />
                            <span className={`${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>Found Items</span>
                        </NavLink>

                        {isLoggedIn && (
                            <>
                                <NavLink
                                    to={dashboardLink}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm'
                                                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                        }`
                                    }
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span className={`${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>Dashboard</span>
                                </NavLink>

                                <NavLink
                                    to="/create-post"
                                    className={({ isActive }) =>
                                        `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm'
                                                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                        }`
                                    }
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className={`${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>Create Post</span>
                                </NavLink>
                            </>
                        )}
                    </nav>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-3">
                        <ThemeToggle />
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className={`flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}
                                >
                                    <User className="w-4 h-4" />
                                    <span className={`text-sm font-medium hidden lg:block ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        {user?.name?.split(' ')[0] || 'Profile'}
                                    </span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className={`flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <NavLink
                                to="/login"
                                className={`flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg ${
                                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <LogIn className="w-4 h-4" />
                                <span className={`text-sm font-medium ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>Sign In</span>
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={toggleMenu}
                            className={`p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn && <MessageNotification />}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <NavLink
                                to="/lost-items"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium ${
                                        isActive
                                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                    }`
                                }
                            >
                                <MapPin className="w-5 h-5" />
                                <span>Lost Items</span>
                            </NavLink>

                            <NavLink
                                to="/found-items"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium ${
                                        isActive
                                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                    }`
                                }
                            >
                                <Eye className="w-5 h-5" />
                                <span>Found Items</span>
                            </NavLink>

                            {isLoggedIn && (
                                <>
                                    <NavLink
                                        to={dashboardLink}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium ${
                                                isActive
                                                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                            }`
                                        }
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span>Dashboard</span>
                                    </NavLink>

                                    <NavLink
                                        to="/create-post"
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium ${
                                                isActive
                                                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                            }`
                                        }
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span>Create Post</span>
                                    </NavLink>

                                    <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center px-5">
                                            <div className="flex-shrink-0">
                                                <User className="w-10 h-10 text-gray-400" />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                                    {user?.name}
                                                </div>
                                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    {user?.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 px-2 space-y-1">
                                            <button
                                                onClick={() => {
                                                    navigate('/profile');
                                                    closeMenu();
                                                }}
                                                className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                                            >
                                                <User className="w-5 h-5 mr-3" />
                                                Profile
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                                            >
                                                <LogOut className="w-5 h-5 mr-3" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {!isLoggedIn && (
                                <div className="pt-4">
                                    <NavLink
                                        to="/login"
                                        onClick={closeMenu}
                                        className={`flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                                            isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <span className={`${
                                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                        }`}>Sign In</span>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;