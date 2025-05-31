import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import { FiMessageSquare } from 'react-icons/fi';

const MessageNotification = () => {
    const [unreadCount, setUnreadCount] = useState(0);
    const { authenticationToken, isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn || !user) return;

        const fetchUnreadCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/chat/unread-count', {
                    headers: {
                        Authorization: authenticationToken
                    }
                });
                setUnreadCount(response.data.count);
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        fetchUnreadCount();

        // Initialize socket connection
        const socket = io('http://localhost:5000', {
            withCredentials: true,
            auth: {
                token: authenticationToken.replace('Bearer ', '')
            }
        });

        // Join user's room
        socket.emit('join', user._id);

        // Listen for new message notifications
        socket.on('new_message_notification', () => {
            fetchUnreadCount();
        });

        return () => {
            socket.off('new_message_notification');
            socket.close();
        };
    }, [isLoggedIn, user, authenticationToken]);

    const handleClick = () => {
        navigate('/messages');
    };

    if (!isLoggedIn) return null;

    return (
        <div 
            className="relative cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleClick}
        >
            <FiMessageSquare className="text-2xl text-gray-600" />
            {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                </span>
            )}
        </div>
    );
};

export default MessageNotification; 