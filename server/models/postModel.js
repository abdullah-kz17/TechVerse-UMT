const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ['lost', 'found'], required: true },
    description: { type: String },
    imageUrl: { type: String },
    location: { type: String, required: true },
    dateReported: { type: Date, default: Date.now },
    dateLostOrFound: { type: Date },
    isApproved:{type:Boolean,required:true},
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['open', 'claimed',], default: 'open' },
    claims: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClaimRequest' }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);