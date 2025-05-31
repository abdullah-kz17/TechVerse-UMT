const express = require('express');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    approvePost,
    getMyPosts,
    getPendingPosts,
} = require('../Controllers/postController.js');

const protect = require('../middlewares/authMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');
const { upload } = require('../config/cloudinary.js');

const postRoute = express.Router();

// Create a new lost/found post (with image)
postRoute.post('/create', protect, upload.single('imageUrl'), createPost);

// Get all approved posts with filters
postRoute.get('/all', getPosts);

// Get posts by logged-in user
postRoute.get('/my', protect, getMyPosts);

// Admin: Get posts pending approval
postRoute.get('/pending', protect, adminMiddleware, getPendingPosts);

// Get single post by ID
postRoute.get('/:id', getPostById);

// Update post (owner or admin)
postRoute.patch('/:id', protect, upload.single('imageUrl'), updatePost);

// Delete/Archive post (owner or admin)
postRoute.delete('/:id', protect, deletePost);

// Approve post (admin only)
postRoute.patch('/approve/:id', protect, adminMiddleware, approvePost);


module.exports = postRoute;