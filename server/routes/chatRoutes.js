const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
    getMessages,
    sendMessage,
    getConversations,
    getUnreadCount
} = require('../controllers/chatController');

// Get all conversations for current user
router.get('/conversations', protect, getConversations);

// Get messages between current user and another user
router.get('/messages/:userId', protect, getMessages);

// Send a message
router.post('/messages', protect, sendMessage);

// Get unread message count
router.get('/unread-count', protect, getUnreadCount);

module.exports = router; 