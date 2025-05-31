const express = require('express');
const {
    createClaimRequest,
    updateClaimRequestStatus,
    getMyClaimRequests,
    getClaimsOnMyPosts,
} = require('../Controllers/claimController.js');

const protect  = require('../middlewares/authMiddleware.js');

const { upload } = require('../config/cloudinary.js');

const claimRoute = express.Router();

claimRoute.post(
    '/',
    protect,
    upload.single('image'),
    createClaimRequest
);

// Update claim status (only finder or admin)
claimRoute.patch('/:id/status', protect,  updateClaimRequestStatus);

// Get my claim requests (claimer)
claimRoute.get('/myrequests', protect, getMyClaimRequests);

// Get claim requests on my posts (finder)
claimRoute.get('/onmyposts', protect, getClaimsOnMyPosts);

module.exports = claimRoute;