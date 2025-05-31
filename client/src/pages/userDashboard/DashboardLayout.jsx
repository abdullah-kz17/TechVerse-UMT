// src/layouts/DashboardLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FiUser, FiEdit3, FiLogOut, FiHome } from "react-icons/fi";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl p-6 space-y-6">
                <h1 className="text-2xl font-bold text-blue-700">User Dashboard</h1>
                <nav className="flex flex-col gap-4">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                        <FiHome /> Dashboard Home
                    </Link>
                    <Link
                        to="/dashboard/my-posts"
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                        <FiEdit3 /> My Posts
                    </Link>
                    <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                        <FiUser /> Profile
                    </Link>
                    <Link
                        to="/dashboard/my-claims"
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                        <FiUser /> My Claim Requests
                    </Link>
                    <Link
                        to="/dashboard/user-claims"
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                        <FiUser /> User Claim Requests
                    </Link>
                    <button
                        className="flex items-center gap-2 text-red-600 hover:text-red-800"
                        onClick={() => console.log("Logout")}
                    >
                        <FiLogOut /> Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
