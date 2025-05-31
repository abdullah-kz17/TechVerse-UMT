// src/components/tables/AdminPostsTable.jsx
import React from 'react';
import { FaEye, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminPostsTable = ({ posts, onApprove }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md mt-6">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                <tr>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts?.length > 0 ? (
                    posts.map((post) => (
                        <tr
                            key={post._id}
                            className="border-b border-gray-200 hover:bg-pink-50 transition duration-200"
                        >
                            <td className="py-3 px-4">{post.name}</td>
                            <td className="py-3 px-4">{post.category}</td>
                            <td className="py-3 px-4">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 space-x-3 flex items-center">
                                <Link
                                    to={`/post/${post._id}`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FaEye />
                                </Link>
                                <button
                                    onClick={() => onApprove(post._id)}
                                    className="text-green-600 hover:text-green-800"
                                >
                                    <FaCheck />
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
