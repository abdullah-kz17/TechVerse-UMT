import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClaimsOnMyPosts, updateClaimStatus } from '../../../store/thunks/claimThunk';
import { toast } from 'react-toastify';
import PostClaimsTable from "../../../components/claim/PostClaimsTable.jsx";

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
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Claims on Your Posts</h2>
            <PostClaimsTable
                claims={postClaims}
                loading={loading}
                onStatusChange={handleClaimStatusChange}
            />
        </div>
    );
};

export default UserClaims;
