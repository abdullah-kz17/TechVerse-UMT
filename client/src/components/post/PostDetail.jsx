import React from "react";
import { FiMapPin, FiCalendar, FiPhone, FiUser } from "react-icons/fi";

const PostDetail = ({ post }) => {
    if (!post) return <p>No post data found.</p>;

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

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto space-y-4">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-64 object-cover rounded-lg"
            />
            <h2 className="text-2xl font-bold text-blue-700">{name}</h2>

            <p className="text-gray-700"><strong>Category:</strong> {category}</p>
            <p className="text-gray-700"><strong>Type:</strong> {type}</p>
            <p className="text-gray-700"><strong>Description:</strong> {description}</p>
            <div className="flex items-center text-gray-600">
                <FiMapPin className="mr-2" />
                <span><strong>Location:</strong> {location}</span>
            </div>
            <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-2" />
                <span><strong>Date:</strong> {new Date(dateLostOrFound).toDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
                <FiPhone className="mr-2" />
                <span><strong>Contact:</strong> {contactInfo}</span>
            </div>

            <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FiUser className="mr-2" /> Posted By
                </h3>
                <p className="text-gray-700">
                    <strong>Username:</strong> {postedBy?.username || "N/A"}
                </p>
                <p className="text-gray-700">
                    <strong>Email:</strong> {postedBy?.email || "N/A"}
                </p>
            </div>

            <p className="text-gray-500 text-sm">
                Posted on: {new Date(createdAt).toLocaleString()}
            </p>
        </div>
    );
};

export default PostDetail;
