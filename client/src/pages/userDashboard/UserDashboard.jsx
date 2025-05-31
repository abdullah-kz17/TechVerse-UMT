// src/pages/dashboard/UserDashboard.jsx
import React from "react";

const UserDashboard = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Welcome to Your Dashboard
            </h2>
            <p className="text-gray-700">
                From here, you can manage your posts, update your profile, and track lost/found items.
            </p>
        </div>
    );
};

export default UserDashboard;
