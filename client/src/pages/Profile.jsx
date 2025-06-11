import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleUpdateProfile = () => {
        navigate('/update-profile');
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 mb-8 px-6">
            <div className="bg-white  rounded-xl shadow-lg p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">

                {/* Avatar */}
                <div className="flex-shrink-0">
                    <img
                        src={user?.profilePic || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
                    />
                </div>

                {/* Info */}
                <div className="flex-grow w-full">
                    <h2 className="text-2xl font-bold text-gray-900  mb-1">
                        {user?.username}
                    </h2>
                    <p className="text-gray-600  mb-1">{user?.email}</p>
                    <span
                        className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-medium 
            ${user?.isAdmin
                            ? 'bg-red-100 text-red-700 '
                            : 'bg-blue-100 text-blue-700 '}`}
                    >
                   {user?.isAdmin ? 'Admin' : 'User'}
              </span>

                </div>
            </div>
        </div>
    );
}