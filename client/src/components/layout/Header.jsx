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
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from "../../context/AuthContext.jsx";
import MessageNotification from '../chat/MessageNotification';
import ThemeToggle from '../common/ThemeToggle';

const Header = () => {
    const {user, isLoggedIn, logout} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dashboardLink = user?.role === 'admin' ? '/admin-dashboard' : '/dashboard';
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleNavigation = (path) => {
        navigate(path);
        closeMenu();
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <Link to='/' className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent transition-all duration-200">
                                UMT Lost & Found
                            </Link>
                            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1 transition-colors duration-200">Campus Recovery Portal</p>
                        </div>
                        <div className="sm:hidden">
                            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent transition-all duration-200">
                                UMT L&F
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        <NavLink
                            to="/lost-items-post"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                }`
                            }
                        >
                            <MapPin className="w-4 h-4" />
                            <span>Lost Items</span>
                        </NavLink>

                        <NavLink
                            to="/found-items-post"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                }`
                            }
                        >
                            <Eye className="w-4 h-4" />
                            <span>Found Items</span>
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
                                    <span>Dashboard</span>
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
                                    <span>Create Post</span>
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
                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                                >
                                    <User className="w-4 h-4" />
                                    <span className="text-sm font-medium hidden lg:block">
                                        {user?.name?.split(' ')[0] || 'Profile'}
                                    </span>
                                </button>
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <NavLink
                                to="/login"
                                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <LogIn className="w-4 h-4" />
                                <span className="text-sm font-medium">Sign In</span>
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn && <MessageNotification />}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 space-y-2 transition-colors duration-200">
                        <NavLink
                            to="/lost-items-post"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            <MapPin className="w-4 h-4" />
                            <span>Lost Items</span>
                        </NavLink>

                        <NavLink
                            to="/found-items-post"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            <Eye className="w-4 h-4" />
                            <span>Found Items</span>
                        </NavLink>

                        {isLoggedIn && (
                            <>
                                <NavLink
                                    to={dashboardLink}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`
                                    }
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Dashboard</span>
                                </NavLink>

                                <NavLink
                                    to="/create-post"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`
                                    }
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Create Post</span>
                                </NavLink>

                                <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
                                    <button
                                        onClick={() => handleNavigation('/profile')}
                                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full transition-all duration-200"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Profile ({user?.name})</span>
                                    </button>

                                    <button
                                        onClick={logout}
                                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 w-full transition-all duration-200"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        )}

                        {!isLoggedIn && (
                            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
                                <NavLink
                                    to="/login"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Sign In</span>
                                </NavLink>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
