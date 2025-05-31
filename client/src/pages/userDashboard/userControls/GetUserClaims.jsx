import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClaimsOnMyPosts, updateClaimStatus } from '../../../store/thunks/claimThunk';
import { toast } from 'react-toastify';
import PostClaimsTable from "../../../components/claim/PostClaimsTable.jsx";
import { FaSpinner, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const UserClaims = () => {
    const dispatch = useDispatch();
    const { postClaims, loading, error, successMessage } = useSelector((state) => state.claim);

    useEffect(() => {
        dispatch(getClaimsOnMyPosts());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) toast.success(successMessage);
        if (error) toast.error(error);
    }, [successMessage, error]);

    const handleClaimStatusChange = (id, status) => {
        dispatch(updateClaimStatus({ id, status }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl mx-auto p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center mb-8">
                    Claims on Your Posts
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <FaSpinner className="animate-spin text-4xl text-blue-600" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center text-red-600 font-medium py-10">
                        <FaExclamationTriangle className="text-3xl mb-2" />
                        <p>{error}</p>
                    </div>
                ) : postClaims.length === 0 ? (
                    <div className="flex flex-col items-center text-gray-700 py-10">
                        <FaInfoCircle className="text-3xl text-blue-500 mb-2" />
                        <p className="text-center text-lg">
                            No claims have been submitted on your posts yet.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <PostClaimsTable
                            claims={postClaims}
                            loading={loading}
                            onStatusChange={handleClaimStatusChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserClaims;
