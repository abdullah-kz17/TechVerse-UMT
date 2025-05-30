import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosPublic } from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPublic.post(`/auth/reset-password/${token}`, { password });

            if (response.data.success) {
                toast.success(" Password reset successfully");
                setPassword('');
                navigate('/login');
            } else {
                toast.error(response.data.message || " Something went wrong");
            }
        } catch (error) {
            console.error("Reset password error:", error);
            toast.error(error?.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 transition-colors">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Your Password</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            New Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-9 text-gray-500 dark:text-gray-300"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}