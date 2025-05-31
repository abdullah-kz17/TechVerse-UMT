import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiCalendar, FiUser, FiEye, FiMessageCircle } from "react-icons/fi";
import ChatButton from "../chat/ChatButton";
import { useAuth } from "../../context/AuthContext";

const PostCard = ({ post }) => {
    const { user } = useAuth();
    const isPostCreator = user?._id === post.postedBy?._id;

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <img
                    src={post.imageUrl}
                    alt={post.name}
                    className="h-48 sm:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                        post.type === "found" 
                            ? "bg-green-500/90 text-white" 
                            : "bg-red-500/90 text-white"
                    }`}>
                        {post.type === "found" ? "Found" : "Lost"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 space-y-4">
                {/* Title */}
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                        {post.description?.substring(0, 120)}...
                    </p>
                </div>

                {/* Info Grid */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FiMapPin className="text-blue-500 dark:text-blue-400 flex-shrink-0" size={16} />
                        <span className="truncate">{post.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FiCalendar className="text-blue-500 dark:text-blue-400 flex-shrink-0" size={16} />
                        <span>{new Date(post.dateLostOrFound).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* User Info */}
                {post.postedBy && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <FiUser className="text-white" size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                {post.postedBy.username}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs truncate">
                                {post.postedBy.email}
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Link
                        to={`/posts/${post._id}`}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 group/btn"
                    >
                        <FiEye size={16} className="transition-transform group-hover/btn:rotate-12" />
                        <span>View Details</span>
                    </Link>
                    
                    <div className="flex gap-2">
                        {post.type === "found" && (
                            <Link
                                to={`/claim/${post._id}`}
                                className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 text-center"
                            >
                                Claim Item
                            </Link>
                        )}
                        
                        {post.postedBy && !isPostCreator && (
                            <div className="flex-1 sm:flex-none">
                                <ChatButton 
                                    userId={post.postedBy._id} 
                                    username={post.postedBy.username}
                                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                                >
                                    <FiMessageCircle size={16} />
                                    <span className="hidden sm:inline">Chat</span>
                                </ChatButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;