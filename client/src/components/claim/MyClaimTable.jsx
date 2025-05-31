// src/components/claim/MyClaimsTable.jsx
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const statusIcon = {
    pending: <FaClock className="text-yellow-500" />,
    approved: <FaCheckCircle className="text-green-600" />,
    rejected: <FaTimesCircle className="text-red-600" />,
};

const MyClaimsTable = ({ claims }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Item</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Category</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Location</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Message</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                {claims.map((claim) => (
                    <tr key={claim._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{claim.post?.name}</td>
                        <td className="px-4 py-2">{claim.post?.category}</td>
                        <td className="px-4 py-2">{claim.post?.location || '-'}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{claim.message || 'N/A'}</td>
                        <td className="px-4 py-2 flex items-center gap-1">
                            {statusIcon[claim.status] || statusIcon.pending}
                            <span className="capitalize">{claim.status}</span>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                            {new Date(claim.createdAt).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyClaimsTable;
