import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { FiMessageSquare, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authenticationToken, isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const fetchConversations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/chat/conversations', {
                    headers: {
                        Authorization: authenticationToken
                    }
                });
                // Filter out conversations with self
                const filteredConversations = response.data.filter(
                    conv => conv._id !== user._id
                );
                setConversations(filteredConversations);
            } catch (error) {
                console.error('Error fetching conversations:', error);
                setError('Failed to load conversations');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConversations();
    }, [isLoggedIn, authenticationToken, navigate, user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (days === 1) {
            return 'Yesterday';
        } else if (days < 7) {
            return date.toLocaleDateString([], { weekday: 'short' });
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    };

    const handleConversationClick = (conversation) => {
        // Prevent self-chatting
        if (conversation._id === user._id) {
            return;
        }
        navigate(`/chat/${conversation._id}`, { 
            state: { username: conversation.username }
        });
    };

    if (!isLoggedIn) return null;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow-md p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link to="/" className="text-gray-600 hover:text-gray-800">
                        <FiArrowLeft className="text-xl" />
                    </Link>
                    <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
                </div>
            </div>

            {/* Conversations List */}
            <div className="max-w-4xl mx-auto p-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="text-center py-12">
                        <FiMessageSquare className="mx-auto text-4xl text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
                        <p className="mt-2 text-gray-500">Start a conversation by clicking the chat button on any post.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {conversations.map((conversation) => (
                            <div
                                key={conversation._id}
                                onClick={() => handleConversationClick(conversation)}
                                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 font-medium">
                                                {conversation.username?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{conversation.username}</h3>
                                            <p className="text-sm text-gray-500 truncate max-w-xs">
                                                {conversation.lastMessage?.content || 'No messages yet'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        {conversation.lastMessage?.createdAt && (
                                            <span className="text-xs text-gray-500">
                                                {formatDate(conversation.lastMessage.createdAt)}
                                            </span>
                                        )}
                                        {conversation.unreadCount > 0 && (
                                            <span className="mt-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {conversation.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages; 