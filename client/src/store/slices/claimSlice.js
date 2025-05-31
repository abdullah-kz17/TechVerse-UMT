import { createSlice } from '@reduxjs/toolkit';
import {
    createClaimRequest,
    getMyClaimRequests,
    getClaimsOnMyPosts,
    updateClaimStatus,
} from '../thunks/claimThunk';

const initialState = {
    myClaims: [],
    postClaims: [],
    loading: false,
    error: null,
    successMessage: null,
};

const claimSlice = createSlice({
    name: 'claim',
    initialState,
    reducers: {
        clearClaimMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Claim Request
            .addCase(createClaimRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createClaimRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = 'Claim request submitted successfully';
                state.myClaims.unshift(action.payload);
            })
            .addCase(createClaimRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get My Claim Requests
            .addCase(getMyClaimRequests.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyClaimRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.myClaims = action.payload;
            })
            .addCase(getMyClaimRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Claims On My Posts
            .addCase(getClaimsOnMyPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getClaimsOnMyPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.postClaims = action.payload;
            })
            .addCase(getClaimsOnMyPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Claim Status
            .addCase(updateClaimStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateClaimStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = `Claim ${action.payload.status} successfully`;
                state.postClaims = state.postClaims.map(claim =>
                    claim._id === action.payload._id ? action.payload : claim
                );
            })
            .addCase(updateClaimStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearClaimMessages } = claimSlice.actions;
export default claimSlice.reducer;
