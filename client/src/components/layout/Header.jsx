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

const Header = () => {
    const {user,isLoggedIn} = useAuth();
    const logout = () => console.log('Logout'); // Mock logout

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState('/lost-items-post');

    const dashboardLink = user?.role === 'admin' ? '/admin-dashboard' : '/dashboard';

    const navigate = useNavigate();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleNavigation = (path) => {
        setActiveRoute(path);
        navigate(path);
        closeMenu();
    };

    const isActive = (path) => activeRoute === path;

    return (
        <header className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo Section */}
                    <div className="flex items-center space-x-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <Link to='/' className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                UMT Lost & Found
                            </Link>
                            <p className="text-xs text-gray-500 -mt-1">Campus Recovery Portal</p>
                        </div>
                        <div className="sm:hidden">
                            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
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
                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
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
                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
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
                                                ? 'bg-blue-100 text-blue-700 shadow-sm'
                                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
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
                                                ? 'bg-blue-100 text-blue-700 shadow-sm'
                                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
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
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                >
                                    <User className="w-4 h-4" />
                                    <span className="text-sm font-medium hidden lg:block">
                    {user?.name?.split(' ')[0] || 'Profile'}
                  </span>
                                </button>
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <NavLink
                                to="/login"
                                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <LogIn className="w-4 h-4" />
                                <span className="text-sm font-medium">Sign In</span>
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
                        <NavLink
                            to="/lost-items-post"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50'
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
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50'
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
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50'
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
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Create Post</span>
                                </NavLink>

                                <div className="border-t border-gray-100 pt-2 mt-2">
                                    <button
                                        onClick={() => handleNavigation('/profile')}
                                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 w-full transition-all duration-200"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Profile ({user?.name})</span>
                                    </button>

                                    <button
                                        onClick={logout}
                                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-all duration-200"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        )}

                        {!isLoggedIn && (
                            <div className="border-t border-gray-100 pt-2 mt-2">
                                <NavLink
                                    to="/login"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md"
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
