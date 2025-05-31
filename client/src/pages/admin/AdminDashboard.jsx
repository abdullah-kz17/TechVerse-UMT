import React from "react";

const AdminDashboard = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Welcome to the Admin Dashboard
            </h2>
            <p className="text-gray-700">
                Here you can manage pending posts, user accounts, and platform settings.
            </p>
        </div>
    );
};

export default AdminDashboard;
