const Message = require('../models/chatModel');
const asyncHandler = require('express-async-handler');

// Get all messages between two users
const getMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    const messages = await Message.find({
        $or: [
            { sender: currentUserId, receiver: userId },
            { sender: userId, receiver: currentUserId }
        ]
    })
        .populate('sender', 'name email profilePicture')
        .populate('receiver', 'name email profilePicture')
        .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
        {
            sender: userId,
            receiver: currentUserId,
            isRead: false
        },
        {
            isRead: true
        }
    );

    res.status(200).json(messages);
});

// Send a message
const sendMessage = asyncHandler(async (req, res) => {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;

    const message = await Message.create({
        sender: senderId,
        receiver: receiverId,
        content
    });

    const populatedMessage = await Message.findById(message._id)
        .populate('sender', 'name email profilePicture')
        .populate('receiver', 'name email profilePicture');

    res.status(201).json(populatedMessage);
});

// Get unread message count
const getUnreadCount = asyncHandler(async (req, res) => {
    const currentUserId = req.user._id;

    const count = await Message.countDocuments({
        receiver: currentUserId,
        isRead: false
    });

    res.status(200).json({ count });
});

// Get all conversations for current user
const getConversations = asyncHandler(async (req, res) => {
    const currentUserId = req.user._id;

    // Get all unique users the current user has chatted with
    const conversations = await Message.aggregate([
        {
            $match: {
                $or: [
                    { sender: currentUserId },
                    { receiver: currentUserId }
                ]
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $group: {
                _id: {
                    $cond: [
                        { $eq: ['$sender', currentUserId] },
                        '$receiver',
                        '$sender'
                    ]
                },
                lastMessage: { $first: '$$ROOT' },
                unreadCount: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    { $eq: ['$receiver', currentUserId] },
                                    { $eq: ['$isRead', false] }
                                ]
                            },
                            1,
                            0
                        ]
                    }
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                _id: 1,
                lastMessage: 1,
                unreadCount: 1,
                'user.name': 1,
                'user.email': 1,
                'user.profilePicture': 1
            }
        }
    ]);

    res.status(200).json(conversations);
});

module.exports = {
    getMessages,
    sendMessage,
    getUnreadCount,
    getConversations
}; 