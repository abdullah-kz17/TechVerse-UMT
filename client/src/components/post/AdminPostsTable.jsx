import React from 'react';
import { FaEye, FaCheck, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminPostsTable = ({ posts, onApprove, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg mt-6">
            <table className="min-w-full border-collapse">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                <tr>
                    <th className="py-4 px-5 text-left">Title</th>
                    <th className="py-4 px-5 text-left">Category</th>
                    <th className="py-4 px-5 text-left">Date</th>
                    <th className="py-4 px-5 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts?.length > 0 ? (
                    posts.map((post) => (
                        <tr
                            key={post._id}
                            className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                        >
                            <td className="py-4 px-5 font-medium">{post.name}</td>
                            <td className="py-4 px-5 capitalize">{post.category}</td>
                            <td className="py-4 px-5">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-5 flex items-center space-x-4">
                                <Link
                                    to={`/post/${post._id}`}
                                    className="text-blue-600 hover:text-blue-800 transition"
                                    title="View"
                                >
                                    <FaEye />
                                </Link>
                                <button
                                    onClick={() => onApprove(post._id)}
                                    className="text-green-600 hover:text-green-800 transition"
                                    title="Approve"
                                >
                                    <FaCheck />
                                </button>
                                <button
                                    onClick={() => onDelete(post._id)}
                                    className="text-red-600 hover:text-red-800 transition"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="py-6 text-center text-gray-500">
                            No pending posts.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPostsTable;
