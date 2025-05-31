const Post = require('../models/postModel.js');

// CREATE POST
const createPost = async (req, res) => {
    try {
        const {
            name,
            category,
            type,
            description,
            location,
            dateLostOrFound,
            contactInfo,
        } = req.body;

        const imageUrl = req.file?.path || '';
        const postedBy = req.user._id;
        const isApproved = req.user.role === 'admin';

        const post = new Post({
            name,
            category,
            type,
            description,
            imageUrl,
            location,
            contactInfo,
            dateLostOrFound,
            postedBy,
            isApproved,
            isArchived: false,
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.error('Create Post Error:', error);
        res.status(500).json({ message: 'Failed to create post', error });
    }
};

// GET FILTERED & APPROVED POSTS
const getPosts = async (req, res) => {
    try {
        const { type, category, location, date } = req.query;

        const filter = {
            isApproved: true,         // ✅ Only approved posts
            ...(type && { type }),    // e.g., 'lost' or 'found'
            ...(category && { category }),
            ...(location && { location }),
            ...(date && { dateLostOrFound: { $gte: new Date(date) } }),
        };

        const posts = await Post.find(filter)
            .populate('postedBy', 'username email')
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        console.error('Get Posts Error:', error);
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};




// GET POST BY ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('postedBy', 'username email')
            .populate({
                path: 'claims',
                populate: { path: 'claimer', select: 'username email' },
            });

        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.json(post);
    } catch (error) {
        console.error('Get Post By ID Error:', error);
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

// UPDATE POST
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const isOwnerOrAdmin = post.postedBy.toString() === req.user._id || req.user.role === 'admin';
        if (!isOwnerOrAdmin)
            return res.status(403).json({ message: 'Unauthorized' });

        const updates = req.body;
        if (req.file?.path) updates.imageUrl = req.file.path;

        const updated = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });

        res.json(updated);
    } catch (error) {
        console.error('Update Post Error:', error);
        res.status(500).json({ message: 'Failed to update post', error });
    }
};

// DELETE POST
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const isOwnerOrAdmin = post.postedBy.toString() === req.user._id || req.user.role === 'admin';

        if (!isOwnerOrAdmin)
            return res.status(403).json({ message: 'Unauthorized' });

        if (req.user.role === 'admin') {
            post.isArchived = true;
            await post.save();
            return res.json({ message: 'Post archived by admin' });
        }

        await post.deleteOne();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete Post Error:', error);
        res.status(500).json({ message: 'Failed to delete post', error });
    }
};

// APPROVE POST
const approvePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.isApproved = true;
        await post.save();

        res.json({ message: 'Post approved' });
    } catch (error) {
        console.error('Approve Post Error:', error);
        res.status(500).json({ message: 'Failed to approve post', error });
    }
};


// GET MY POSTS
const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error('Get My Posts Error:', error);
        res.status(500).json({ message: 'Error fetching your posts', error });
    }
};

// ADMIN: GET PENDING POSTS
const getPendingPosts = async (req, res) => {
    try {
        const posts = await Post.find({ isApproved: false })
            .populate('postedBy', 'username email')
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        console.error('Get Pending Posts Error:', error);
        res.status(500).json({ message: 'Failed to fetch pending posts', error });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    approvePost,
    getMyPosts,
    getPendingPosts,
};