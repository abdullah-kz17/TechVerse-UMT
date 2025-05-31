import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import { FiSend, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Chat = () => {
    const { userId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, authenticationToken, isLoggedIn } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const { username } = location.state || {};

    // Prevent self-chatting
    useEffect(() => {
        if (userId === user?._id) {
            navigate('/messages');
        }
    }, [userId, user, navigate]);

    // Debug logging
    useEffect(() => {
        console.log('Auth State:', { user, isLoggedIn, hasToken: !!authenticationToken });
    }, [user, isLoggedIn, authenticationToken]);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoggedIn || !user || !authenticationToken) {
            console.log('Redirecting to login - Auth check failed:', { isLoggedIn, hasUser: !!user, hasToken: !!authenticationToken });
            navigate('/login');
        }
    }, [isLoggedIn, user, authenticationToken, navigate]);

    // Initialize socket connection
    useEffect(() => {
        if (!isLoggedIn || !user || !authenticationToken) return;

        console.log('Initializing socket connection with token:', authenticationToken);

        const newSocket = io('http://localhost:5000', {
            withCredentials: true,
            auth: {
                token: authenticationToken.replace('Bearer ', '')
            }
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setError('Failed to connect to chat server');
        });

        newSocket.on('connect', () => {
            console.log('Socket connected successfully');
        });

        setSocket(newSocket);

        // Join user's room
        if (user?._id) {
            newSocket.emit('join', user._id);
        }

        return () => {
            console.log('Cleaning up socket connection');
            newSocket.close();
        };
    }, [user, authenticationToken, isLoggedIn]);

    // Listen for incoming messages
    useEffect(() => {
        if (!socket) return;

        socket.on('receive_message', (data) => {
            console.log('Received message:', data);
            setMessages(prev => [...prev, data]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [socket]);

    // Fetch chat history
    useEffect(() => {
        const fetchMessages = async () => {
            if (!userId || !authenticationToken) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                console.log('Fetching messages with token:', authenticationToken);
                const response = await axios.get(
                    `http://localhost:5000/api/chat/messages/${userId}`,
                    {
                        headers: {
                            Authorization: authenticationToken
                        }
                    }
                );
                console.log('Fetched messages:', response.data);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setError('Failed to load messages');
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoggedIn && user && authenticationToken) {
            fetchMessages();
        }
    }, [userId, authenticationToken, isLoggedIn, user]);

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        try {
            console.log('Sending message with token:', authenticationToken);
            // Send message to server
            const response = await axios.post(
                'http://localhost:5000/api/chat/messages',
                {
                    receiverId: userId,
                    content: newMessage
                },
                {
                    headers: {
                        Authorization: authenticationToken
                    }
                }
            );

            // Emit message through socket
            socket.emit('private_message', {
                senderId: user._id,
                receiverId: userId,
                content: newMessage,
                createdAt: new Date()
            });

            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message');
        }
    };

    if (!isLoggedIn || !user || !authenticationToken) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-md p-4 flex items-center gap-4">
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                    <FiArrowLeft className="text-xl" />
                </Link>
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Chat with {username}</h1>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === user._id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-3 ${
                                        message.sender === user._id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                    }`}
                                >
                                    <p>{message.content}</p>
                                    <p className="text-xs mt-1 opacity-70">
                                        {new Date(message.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="bg-white p-4 shadow-md">
                <div className="max-w-2xl mx-auto flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
                        disabled={isLoading || !newMessage.trim()}
                    >
                        <FiSend className="text-xl" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat; 