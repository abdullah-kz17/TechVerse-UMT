import { createAsyncThunk } from '@reduxjs/toolkit';
import {axiosPrivate} from "../../utils/axiosInstance.js";

// Create a new claim request
export const createClaimRequest = createAsyncThunk(
    'claim/createClaimRequest',
    async ({ postId, message, image }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('postId', postId);
            formData.append('message', message || '');
            if (image) formData.append('image', image);

            const response = await axiosPrivate.post('/claim',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to create claim request');
        }
    }
);

// Get current user's claim requests
export const getMyClaimRequests = createAsyncThunk(
    'claim/getMyClaimRequests',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosPrivate.get('/claim/myrequests');
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch your claim requests');
        }
    }
);

// Get claim requests on current user's posts
export const getClaimsOnMyPosts = createAsyncThunk(
    'claim/getClaimsOnMyPosts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosPrivate.get('/claim/onmyposts');
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch claims on your posts');
        }
    }
);

// Update the status of a claim request
export const updateClaimStatus = createAsyncThunk(
    'claim/updateClaimStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const { data } = await axiosPrivate.patch(`/claim/${id}/status`, { status });
            return data.claimRequest;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update claim status');
        }
    }
);
