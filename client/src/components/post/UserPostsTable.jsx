// src/components/tables/UserPostsTable.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const UserPostsTable = ({ posts, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md mt-6">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts?.length > 0 ? (
                    posts.map((post) => (
                        <tr
                            key={post._id}
                            className="border-b border-gray-200 hover:bg-blue-50 transition duration-200"
                        >
                            <td className="py-3 px-4">{post.name}</td>
                            <td className="py-3 px-4">{post.category}</td>
                            <td className="py-3 px-4">
                  <span
                      className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          post.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {post.status || 'pending'}
                  </span>
                            </td>
                            <td className="py-3 px-4">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 space-x-2 flex items-center">
                                <Link
                                    to={`/post/${post._id}`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FaEye />
                                </Link>
                                <Link
                                    to={`/edit-post/${post._id}`}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    <FaEdit />
                                </Link>
                                <button
                                    onClick={() => onDelete(post._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="py-6 text-center text-gray-500">
                            No posts found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default UserPostsTable;
