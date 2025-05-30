import React, { useState } from 'react';
import { axiosPublic } from '../utils/axiosInstance';
import { toast } from 'react-toastify';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosPublic.post('/auth/forgot-password', { email });

            if (response?.data?.success) {
                toast.success(" Email sent successfully");
                setEmail('');
            } else {
                toast.error(response?.data?.message || " Something went wrong");
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            toast.error(error?.response?.data?.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900 transition-colors">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Forgot Your Password?
                </h2>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Enter your registered email and we'll send you a password reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center gap-2 text-white py-2 rounded-lg transition duration-200 ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 00-8 10h4z"
                                    ></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
