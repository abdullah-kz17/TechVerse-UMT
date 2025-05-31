// src/pages/MyClaims.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyClaimRequests } from "../../../store/thunks/claimThunk.js";
import { FaSpinner } from 'react-icons/fa';
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
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">My Claim Requests</h1>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <FaSpinner className="animate-spin text-2xl text-blue-600" />
                </div>
            ) : error ? (
                <div className="text-red-500 font-medium">{error}</div>
            ) : myClaims.length === 0 ? (
                <p className="text-gray-600">You have not submitted any claim requests yet.</p>
            ) : (
                <MyClaimsTable claims={myClaims} />
            )}
        </div>
    );
};

export default MyClaims;
