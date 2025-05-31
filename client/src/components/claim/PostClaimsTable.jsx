import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const PostClaimsTable = ({ claims, loading, onStatusChange }) => {
    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <FaSpinner className="animate-spin text-blue-600 text-3xl" />
            </div>
        );
    }

    if (!claims || claims.length === 0) {
        return <p className="text-gray-600">No claim requests found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-xl shadow">
                <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-left">
                    <th className="p-3">Claimer</th>
                    <th className="p-3">Message</th>
                    <th className="p-3">Proof</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {claims.map((claim) => (
                    <tr key={claim._id} className="border-t hover:bg-gray-50 transition">
                        <td className="p-3">
                            {claim.claimer?.username || 'Unknown'} <br />
                            <span className="text-sm text-gray-500">{claim.claimer?.email}</span>
                        </td>
                        <td className="p-3">{claim.message || '—'}</td>
                        <td className="p-3">
                            {claim.image ? (
                                <img
                                    src={claim.image}
                                    alt="proof"
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ) : (
                                'No image'
                            )}
                        </td>
                        <td className="p-3 capitalize">{claim.status}</td>
                        <td className="p-3 space-x-2">
                            <button
                                onClick={() => onStatusChange(claim._id, 'approved')}
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => onStatusChange(claim._id, 'rejected')}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Reject
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostClaimsTable;
