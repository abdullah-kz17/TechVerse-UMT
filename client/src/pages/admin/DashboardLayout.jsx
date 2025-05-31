// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FiHome, FiUserCheck, FiFileText, FiLogOut } from "react-icons/fi";

const AdminDashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl p-6 space-y-6">
                <h1 className="text-2xl font-bold text-blue-700">Admin Dashboard</h1>
                <nav className="flex flex-col gap-4">
                    <Link
                        to="/admin"
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                        <FiHome /> Dashboard Home
                    </Link>
                    <Link
                        to="/admin-dashboard/pending-posts"
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                        <FiFileText /> Pending Posts
                    </Link>
                    <Link
                        to="/admin/users"
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                        <FiUserCheck /> Manage Users
                    </Link>
                    <button
                        className="flex items-center gap-2 text-red-600 hover:text-red-800"
                        onClick={() => console.log("Admin Logout")}
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

export default AdminDashboardLayout;
