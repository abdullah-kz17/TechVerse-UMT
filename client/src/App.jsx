import React from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import AdminRoute from "./components/protectedRoutes/AdminRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register"));

const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));


function App() {
    return (
        <Router>
            <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
                <Header />
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader /></div>}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgetPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="*" element={<NotFound />} />

                        {/* Authenticated User Routes */}
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    </Routes>
                </Suspense>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
