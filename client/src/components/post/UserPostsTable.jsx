import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaCalendar, FaTag, FaFileAlt, FaUser } from 'react-icons/fa';
import { FiEye, FiEdit2, FiTrash2, FiClock, FiCheckCircle, FiAlertCircle, FiInbox, FiSettings } from 'react-icons/fi';

const UserPostsTable = ({ posts, onDelete }) => {
    const StatusBadge = ({ status }) => {
        const getStatusConfig = (status) => {
            switch (status?.toLowerCase()) {
                case 'approved':
                    return {
                        bg: 'bg-green-100 dark:bg-green-900/30',
                        text: 'text-green-800 dark:text-green-400',
                        icon: FiCheckCircle,
                        dot: 'bg-green-500'
                    };
                case 'pending':
                default:
                    return {
                        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
                        text: 'text-yellow-800 dark:text-yellow-400',
                        icon: FiClock,
                        dot: 'bg-yellow-500'
                    };
            }
        };

        const config = getStatusConfig(status);
        const IconComponent = config.icon;

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                <IconComponent size={12} />
                {status || 'pending'}
            </span>
        );
    };

    const TypeBadge = ({ type }) => (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
            type === 'found' 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
        }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${
                type === 'found' ? 'bg-emerald-500' : 'bg-rose-500'
            }`} />
            {type === 'found' ? 'Found' : 'Lost'}
        </span>
    );

    const ActionButton = ({ onClick, icon: Icon, color, hoverColor, label, disabled = false, to }) => {
        const buttonContent = (
            <>
                <Icon size={16} />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {label}
                </span>
            </>
        );

        const buttonClass = `group relative p-2 rounded-lg transition-all duration-200 ${color} ${hoverColor} ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
        }`;

        if (to) {
            return (
                <Link to={to} className={buttonClass} title={label}>
                    {buttonContent}
                </Link>
            );
        }

        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={buttonClass}
                title={label}
            >
                {buttonContent}
            </button>
        );
    };

    if (!posts || posts.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mt-6">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiInbox className="text-gray-400 dark:text-gray-500" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No Posts Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You haven't created any posts yet. Start by reporting a lost or found item!
                    </p>
                    <Link
                        to="/create-post"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        Create Your First Post
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mt-6 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">My Posts</h2>
                        <p className="text-blue-100 text-sm">
                            {posts.length} post{posts.length !== 1 ? 's' : ''} created
                        </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <FaUser className="text-white" size={20} />
                    </div>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                        <tr>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                <div className="flex items-center gap-2">
                                    <FaFileAlt size={14} />
                                    Title
                                </div>
                            </th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                <div className="flex items-center gap-2">
                                    <FaTag size={14} />
                                    Category
                                </div>
                            </th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                Type
                            </th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                Status
                            </th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                <div className="flex items-center gap-2">
                                    <FaCalendar size={14} />
                                    Date
                                </div>
                            </th>
                            <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {posts.map((post) => (
                            <tr
                                key={post._id}
                                className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                            >
                                <td className="py-4 px-6">
                                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {post.name}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                        {post.category}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <TypeBadge type={post.type} />
                                </td>
                                <td className="py-4 px-6">
                                    <StatusBadge status={post.status} />
                                </td>
                                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <FiClock size={14} className="text-gray-400" />
                                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <ActionButton
                                            to={`/post/${post._id}`}
                                            icon={FiEye}
                                            color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                            hoverColor="hover:bg-blue-200 dark:hover:bg-blue-900/50"
                                            label="View Details"
                                        />
                                        <ActionButton
                                            to={`/edit-post/${post._id}`}
                                            icon={FiEdit2}
                                            color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                                            hoverColor="hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
                                            label="Edit Post"
                                        />
                                        <ActionButton
                                            onClick={() => onDelete(post._id)}
                                            icon={FiTrash2}
                                            color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                            hoverColor="hover:bg-red-200 dark:hover:bg-red-900/50"
                                            label="Delete Post"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-600">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                    >
                        <div className="space-y-4">
                            {/* Title and Badges */}
                            <div className="space-y-2">
                                <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                                    {post.name}
                                </h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <TypeBadge type={post.type} />
                                    <StatusBadge status={post.status} />
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-1">
                                    <FaTag size={12} className="text-gray-400" />
                                    <span>{post.category}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiClock size={12} className="text-gray-400" />
                                    <span>
                                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-2">
                                <Link
                                    to={`/post/${post._id}`}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-center flex items-center justify-center gap-2"
                                >
                                    <FiEye size={16} />
                                    View
                                </Link>
                                <Link
                                    to={`/edit-post/${post._id}`}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-center flex items-center justify-center gap-2"
                                >
                                    <FiEdit2 size={16} />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => onDelete(post._id)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <FiTrash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPostsTable;