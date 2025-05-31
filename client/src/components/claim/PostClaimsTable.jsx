import React from 'react';
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const statusBadge = {
    pending: (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            <FaClock className="text-yellow-500" /> Pending
        </span>
    ),
    approved: (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            <FaCheckCircle className="text-green-500" /> Approved
        </span>
    ),
    rejected: (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            <FaTimesCircle className="text-red-500" /> Rejected
        </span>
    ),
};

const PostClaimsTable = ({ claims, loading, onStatusChange, error, success }) => {
    // Show spinner overlay if loading
    if (loading) {
        return (
            <div className="flex justify-center items-center py-16 min-h-[200px]">
                <FaSpinner className="animate-spin text-blue-600 text-4xl" />
            </div>
        );
    }

    if (error) {
        toast.error(error);
        return (
            <div className="text-center text-red-600 font-semibold py-8">
                {error.includes('Unauthorized') || error.includes('403') ? (
                    <span>You are not authorized to approve or reject this claim.</span>
                ) : (
                    <span>{error}</span>
                )}
            </div>
        );
    }
    if (success) {
        toast.success(success);
    }

    if (!claims || claims.length === 0) {
        return <p className="text-gray-600 text-center py-8">No claim requests found.</p>;
    }

    // Confirm before status change
    const handleStatusChange = (id, status) => {
        const action = status === 'approved' ? 'approve' : 'reject';
        if (window.confirm(`Are you sure you want to ${action} this claim?`)) {
            onStatusChange(id, status);
        }
    };

    return (
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-left">
                        <th className="p-4">Claimer</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">Proof</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {claims.map((claim) => (
                        <tr key={claim._id} className="hover:bg-blue-50 transition">
                            <td className="p-4 min-w-[160px]">
                                <div className="font-semibold text-blue-700">{claim.claimer?.username || 'Unknown'}</div>
                                <div className="text-xs text-gray-500">{claim.claimer?.email}</div>
                            </td>
                            <td className="p-4 max-w-xs break-words">{claim.message || '—'}</td>
                            <td className="p-4">
                                {claim.image ? (
                                    <img
                                        src={claim.image}
                                        alt="proof"
                                        className="w-20 h-20 object-cover rounded shadow border"
                                    />
                                ) : (
                                    <span className="text-gray-400">No image</span>
                                )}
                            </td>
                            <td className="p-4">{statusBadge[claim.status] || statusBadge.pending}</td>
                            <td className="p-4 space-x-2">
                                <button
                                    onClick={() => handleStatusChange(claim._id, 'approved')}
                                    className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
                                    disabled={claim.status !== 'pending'}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusChange(claim._id, 'rejected')}
                                    className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
                                    disabled={claim.status !== 'pending'}
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
