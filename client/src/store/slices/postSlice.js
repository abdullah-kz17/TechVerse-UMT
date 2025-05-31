import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    createPost,
    getLostPosts,
    getFoundPosts,
    getPostById,
    updatePost,
    deletePost,
    approvePost,
    getMyPosts,
    getPendingPosts,
} from '../thunks/postThunk.js';

const initialState = {
    lostPosts: [],
    foundPosts: [],
    selectedPost: null,
    myPosts: [],
    pendingPosts: [],
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        resetPostDetails: (state) => {
            state.selectedPost = null;
        },
        clearPostError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLostPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.lostPosts = action.payload;
            })
            .addCase(getFoundPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.foundPosts = action.payload;
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.selectedPost = action.payload;
                state.loading = false;
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.myPosts = action.payload;
                state.loading = false;
            })
            .addCase(getPendingPosts.fulfilled, (state, action) => {
                state.pendingPosts = action.payload;
                state.loading = false;
            })

            // Shared loading handler
            .addMatcher(
                isAnyOf(
                    createPost.pending,
                    getLostPosts.pending,
                    getFoundPosts.pending,
                    getPostById.pending,
                    updatePost.pending,
                    deletePost.pending,
                    approvePost.pending,
                    getMyPosts.pending,
                    getPendingPosts.pending
                ),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            // Shared success handler (non-list responses)
            .addMatcher(
                isAnyOf(
                    createPost.fulfilled,
                    updatePost.fulfilled,
                    deletePost.fulfilled,
                    approvePost.fulfilled
                ),
                (state) => {
                    state.loading = false;
                }
            )

            // Shared error handler
            .addMatcher(
                isAnyOf(
                    createPost.rejected,
                    getLostPosts.rejected,
                    getFoundPosts.rejected,
                    getPostById.rejected,
                    updatePost.rejected,
                    deletePost.rejected,
                    approvePost.rejected,
                    getMyPosts.rejected,
                    getPendingPosts.rejected
                ),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || action.error.message;
                }
            );
    },
});

export const { resetPostDetails, clearPostError } = postSlice.actions;
export default postSlice.reducer;
