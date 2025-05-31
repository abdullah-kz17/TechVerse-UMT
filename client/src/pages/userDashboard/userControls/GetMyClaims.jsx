import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyClaimRequests } from "../../../store/thunks/claimThunk.js";
import { FaSpinner, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { clearClaimMessages } from "../../../store/slices/claimSlice";
import MyClaimsTable from "../../../components/claim/MyClaimTable.jsx";

const MyClaims = () => {
    const dispatch = useDispatch();
    const { myClaims, loading, error } = useSelector(state => state.claim);

    useEffect(() => {
        dispatch(clearClaimMessages());
        dispatch(getMyClaimRequests());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl mx-auto p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-semibold text-blue-800 mb-8 text-center">
                    My Claim Requests
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <FaSpinner className="animate-spin text-4xl text-blue-600" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center text-red-600 font-medium py-10">
                        <FaExclamationTriangle className="text-3xl mb-2" />
                        <p>{error}</p>
                    </div>
                ) : myClaims.length === 0 ? (
                    <div className="flex flex-col items-center text-gray-700 py-10">
                        <FaInfoCircle className="text-3xl text-blue-500 mb-2" />
                        <p className="text-center text-lg">
                            You haven’t submitted any claim requests yet.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <MyClaimsTable claims={myClaims} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyClaims;
