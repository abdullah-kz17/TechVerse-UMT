const mongoose = require('mongoose');

const claimRequestSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    image: { type: String, default: '' },
    claimer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ClaimRequest', claimRequestSchema);
