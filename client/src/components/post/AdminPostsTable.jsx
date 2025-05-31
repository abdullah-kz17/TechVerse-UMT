import React from 'react';
import { FaEye, FaCheck, FaCalendar, FaTag, FaFileAlt, FaCog } from 'react-icons/fa';
import { FiMoreVertical, FiEye, FiCheckCircle, FiClock, FiInbox } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminPostsTable = ({ posts, onApprove }) => {
    const StatusBadge = ({ type }) => (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
            type === 'found' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${
                type === 'found' ? 'bg-green-500' : 'bg-red-500'
            }`} />
            {type === 'found' ? 'Found' : 'Lost'}
        </span>
    );

    const ActionButton = ({ onClick, icon: Icon, color, hoverColor, label, disabled = false }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`group relative p-2 rounded-lg transition-all duration-200 ${color} ${hoverColor} ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
            }`}
            title={label}
        >
            <Icon size={16} />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
            </span>
        </button>
    );

    if (!posts || posts.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mt-6">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiInbox className="text-gray-400 dark:text-gray-500" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No Pending Posts
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        All caught up! No posts are waiting for approval.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mt-6 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">Pending Posts</h2>
                        <p className="text-purple-100 text-sm">
                            {posts.length} post{posts.length !== 1 ? 's' : ''} awaiting approval
                        </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <FaCog className="text-white" size={20} />
                    </div>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
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
                        {posts.map((post, index) => (
                            <tr
                                key={post._id}
                                className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                            >
                                <td className="py-4 px-6">
                                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {post.name}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                        {post.category}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <StatusBadge type={post.type} />
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
                                        <Link to={`/post/${post._id}`}>
                                            <ActionButton
                                                icon={FiEye}
                                                color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                                hoverColor="hover:bg-blue-200 dark:hover:bg-blue-900/50"
                                                label="View Details"
                                            />
                                        </Link>
                                        <ActionButton
                                            onClick={() => onApprove(post._id)}
                                            icon={FiCheckCircle}
                                            color="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                            hoverColor="hover:bg-green-200 dark:hover:bg-green-900/50"
                                            label="Approve Post"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-600">
                {posts.map((post, index) => (
                    <div
                        key={post._id}
                        className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                    >
                        <div className="space-y-3">
                            {/* Title and Status */}
                            <div className="flex items-start justify-between gap-3">
                                <h3 className="font-medium text-gray-900 dark:text-white flex-1 line-clamp-2">
                                    {post.name}
                                </h3>
                                <StatusBadge type={post.type} />
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
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
                            <div className="flex items-center gap-3 pt-2">
                                <Link
                                    to={`/post/${post._id}`}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center flex items-center justify-center gap-2"
                                >
                                    <FiEye size={16} />
                                    View Details
                                </Link>
                                <button
                                    onClick={() => onApprove(post._id)}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <FiCheckCircle size={16} />
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPostsTable;