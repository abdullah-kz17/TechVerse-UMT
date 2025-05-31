import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiCalendar, FiPhone, FiUser } from "react-icons/fi";

const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105">
            <img
                src={post.imageUrl}
                alt={post.name}
                className="h-52 w-full object-cover"
            />

            <div className="p-4 space-y-3">
                <h3 className="text-xl font-semibold text-blue-700">{post.name}</h3>

                <p className="text-gray-600 text-sm">{post.description?.substring(0, 100)}...</p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiMapPin className="text-blue-600" /> {post.location}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCalendar className="text-blue-600" />
                    {new Date(post.dateLostOrFound).toLocaleDateString()}
                </div>

                {/* User Info */}
                {post.postedBy && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                        <FiUser className="text-blue-600" />
                        <div>
                            <div className="font-medium">{post.postedBy.username}</div>
                            <div className="text-gray-500 text-xs">{post.postedBy.email}</div>
                        </div>
                    </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        to={`/posts/${post._id}`}
                        className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition"
                    >
                        View Details
                    </Link>

                    {post.type === "found" && (
                        <Link
                            to={`/claim/${post._id}`}
                            className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-green-700 transition"
                        >
                            Claim
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
