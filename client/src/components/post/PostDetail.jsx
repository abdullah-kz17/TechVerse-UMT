import React from "react";
import { FiMapPin, FiCalendar, FiPhone, FiUser, FiTag, FiFileText, FiClock, FiMail } from "react-icons/fi";

const PostDetail = ({ post }) => {
    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-8">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiFileText className="text-gray-400 dark:text-gray-500" size={24} />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">No post data found.</p>
                </div>
            </div>
        );
    }

    const {
        imageUrl,
        name,
        category,
        type,
        description,
        location,
        dateLostOrFound,
        contactInfo,
        createdAt,
        postedBy,
    } = post;

    const InfoItem = ({ icon: Icon, label, value, className = "" }) => (
        <div className={`flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl ${className}`}>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="text-blue-600 dark:text-blue-400" size={18} />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                <p className="text-gray-900 dark:text-white font-medium break-words">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Main Content Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    
                    {/* Image Section */}
                    <div className="relative">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                        />
                        
                        {/* Status Badge */}
                        <div className="absolute top-6 left-6">
                            <span className={`px-4 py-2 text-sm font-bold rounded-full backdrop-blur-sm shadow-lg ${
                                type === "found" 
                                    ? "bg-green-500/90 text-white" 
                                    : "bg-red-500/90 text-white"
                            }`}>
                                {type === "found" ? "Found Item" : "Lost Item"}
                            </span>
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-6 right-6">
                            <span className="px-4 py-2 text-sm font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-full backdrop-blur-sm shadow-lg">
                                {category}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                        
                        {/* Title */}
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {name}
                            </h1>
                            
                            {/* Description */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl p-6 border border-blue-100 dark:border-gray-600">
                                <div className="flex items-center gap-2 mb-3">
                                    <FiFileText className="text-blue-600 dark:text-blue-400" size={20} />
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Description</h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoItem 
                                icon={FiTag}
                                label="Category"
                                value={category}
                            />
                            <InfoItem 
                                icon={FiMapPin}
                                label="Location"
                                value={location}
                            />
                            <InfoItem 
                                icon={FiCalendar}
                                label="Date Lost/Found"
                                value={new Date(dateLostOrFound).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            />
                            <InfoItem 
                                icon={FiPhone}
                                label="Contact Information"
                                value={contactInfo}
                            />
                        </div>

                        {/* Posted By Section */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl p-6 border border-purple-100 dark:border-gray-600">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <FiUser className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">Posted By</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Contact the poster</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <FiUser className="text-blue-600 dark:text-blue-400" size={14} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Username</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {postedBy?.username || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                            <FiMail className="text-green-600 dark:text-green-400" size={14} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</p>
                                            <p className="font-semibold text-gray-900 dark:text-white break-all">
                                                {postedBy?.email || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timestamp */}
                        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
                            <FiClock size={16} />
                            <span>
                                Posted on {new Date(createdAt).toLocaleString('en-US', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;