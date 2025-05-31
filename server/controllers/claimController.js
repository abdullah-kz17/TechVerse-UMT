const ClaimRequest = require('../Models/claimModel.js');
const Post = require('../models/postModel.js');
const User = require('../models/UserModel.js');
const sendEmail = require('../config/sendEmail.js');

// Create a new claim request for a found item
const createClaimRequest = async (req, res) => {
    try {
        const { postId, message } = req.body;
        const claimerId = req.user._id;

        // Validate postId
        if (!postId || !postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid or missing postId' });
        }

        const post = await Post.findById(postId).populate('postedBy', 'username email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.type !== 'found') {
            return res.status(400).json({ message: 'Can only claim found items' });
        }

        const existingClaim = await ClaimRequest.findOne({ post: postId, claimer: claimerId });
        if (existingClaim) {
            return res.status(400).json({ message: 'You have already requested to claim this item' });
        }

        const imageUrl = req.file?.path; // Optional image from Cloudinary

        const claimRequest = new ClaimRequest({
            post: postId,
            claimer: claimerId,
            message,
            image: imageUrl,
        });

        await claimRequest.save();

        post.claims.push(claimRequest._id);
        await post.save();

        const claimerUser = await User.findById(claimerId).select('username email');

        const emailSubject = `New Claim Request for your Found Item: ${post.name}`;
        const emailText = `
Hello ${post.postedBy.username},

${claimerUser.username} has requested to claim your found item: "${post.name}".

Message from claimer:
${message || 'No message provided.'}

Please log in to your dashboard to approve or reject this claim request.

Regards,  
Lost & Found Portal
        `;

        await sendEmail(post.postedBy.email, emailSubject, emailText);

        res.status(201).json({ message: 'Claim request sent successfully', claimRequest });
    } catch (error) {
        console.error('Create Claim Request Error:', error);
        res.status(500).json({ message: 'Failed to create claim request', error });
    }
};

// Finder can update claim request status
const updateClaimRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const claimRequest = await ClaimRequest.findById(id)
            .populate('post')
            .populate('claimer', 'username email');

        if (!claimRequest) return res.status(404).json({ message: 'Claim request not found' });

        if (
            claimRequest.post.postedBy.toString() !== req.user._id
        ) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        claimRequest.status = status;
        await claimRequest.save();

        if (status === 'approved') {
            claimRequest.post.status = 'claimed';
            await claimRequest.post.save();
        }

        const emailSubject = `Your claim request has been ${status}`;
        const emailText = `
Hello ${claimRequest.claimer.username},

Your claim request for the item "${claimRequest.post.name}" has been ${status} by the owner.

Regards,  
Lost & Found Portal
        `;

        await sendEmail(claimRequest.claimer.email, emailSubject, emailText);

        res.json({ message: `Claim request ${status}`, claimRequest });
    } catch (error) {
        console.error('Update Claim Request Status Error:', error);
        res.status(500).json({ message: 'Failed to update claim request status', error });
    }
};

// Get user's own claim requests
const getMyClaimRequests = async (req, res) => {
    try {
        const claims = await ClaimRequest.find({ claimer: req.user._id })
            .populate('post', 'name category location status')
            .sort({ createdAt: -1 });
        res.json(claims);
    } catch (error) {
        console.error('Get My Claim Requests Error:', error);
        res.status(500).json({ message: 'Error fetching your claim requests', error });
    }
};

// Get claims on user's posts
const getClaimsOnMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.user._id }).select('_id');
        const postIds = posts.map((p) => p._id);

        const claims = await ClaimRequest.find({ post: { $in: postIds } })
            .populate('claimer', 'username email')
            .populate('post', 'name status')
            .sort({ createdAt: -1 });

        res.json(claims);
    } catch (error) {
        console.error('Get Claims on My Posts Error:', error);
        res.status(500).json({ message: 'Error fetching claims on your posts', error });
    }
};

module.exports = {
    createClaimRequest,
    updateClaimRequestStatus,
    getMyClaimRequests,
    getClaimsOnMyPosts,
};
