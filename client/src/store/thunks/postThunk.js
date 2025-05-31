import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate, axiosPublic } from '../../utils/axiosInstance.js';

// Create Post
export const createPost = createAsyncThunk('posts/createPost', async (formData, { rejectWithValue }) => {
    try {
        const res = await axiosPrivate.post('/post/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

// Get Lost Posts
export const getLostPosts = createAsyncThunk('posts/getLostPosts', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosPublic.get('/post/all', { params: { type: 'lost' } });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

// Get Found Posts
export const getFoundPosts = createAsyncThunk('posts/getFoundPosts', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosPublic.get('/post/all', { params: { type: 'found' } });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

// Get Single Post
export const getPostById = createAsyncThunk('posts/getPostById', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosPublic.get(`/post/${id}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch post by ID');
    }
});

// Update Post
export const updatePost = createAsyncThunk('posts/updatePost', async ({ postId, updatedData }, { rejectWithValue }) => {
    try {
        const res = await axiosPrivate.put(`/post/${postId}`, updatedData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

// Delete or Archive Post
export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
    try {
        const res = await axiosPrivate.delete(`/post/${postId}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

// Approve Post (Admin)
export const approvePost = createAsyncThunk('posts/approvePost', async (postId, { rejectWithValue }) => {
    try {
        const res = await axiosPrivate.patch(`/post/approve/${postId}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

// Get My Posts
export const getMyPosts = createAsyncThunk('posts/getMyPosts', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosPrivate.get('/post/my');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

// Admin: Get Pending Posts
export const getPendingPosts = createAsyncThunk('posts/getPendingPosts', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosPrivate.get('/post/pending');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});
