import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare } from 'react-icons/fi';

const ChatButton = ({ userId, username }) => {
    const navigate = useNavigate();

    const handleChat = () => {
        navigate(`/chat/${userId}`, { state: { username } });
    };

    return (
        <button
            onClick={handleChat}
            className="flex items-center gap-2 bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-purple-700 transition"
        >
            <FiMessageSquare className="text-lg" />
            Chat
        </button>
    );
};

export default ChatButton; 