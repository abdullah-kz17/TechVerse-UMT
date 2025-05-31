import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import AdminRoute from "./components/protectedRoutes/AdminRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader.jsx";
import CreatePost from "./pages/post/CreatePost.jsx";
import EditPost from "./pages/post/EditPost.jsx";
import LostPostItems from "./pages/post/LostItemsPosts.jsx";
import FoundItemsPost from "./pages/post/FoundItemsPost.jsx";
import AdminDashboardLayout from "./pages/admin/DashboardLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import PendingPosts from "./pages/admin/adminControls/PendingPosts.jsx";
import PostDetails from "./pages/post/PostDetails.jsx";
import ClaimRequest from "./pages/claim/ClaimRequest.jsx";
import GetMyClaims from "./pages/userDashboard/userControls/GetMyClaims.jsx";
import GetUserClaims from "./pages/userDashboard/userControls/GetUserClaims.jsx";
import Chat from "./pages/chat/Chat.jsx";
import Messages from "./pages/chat/Messages.jsx";
import AuthProvider from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy-loaded public pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

// User Profile Page
const Profile = lazy(() => import("./pages/Profile"));

// Dashboard layout and pages
const DashboardLayout = lazy(() => import("./pages/userDashboard/DashboardLayout.jsx"));
const UserDashboard = lazy(() => import("./pages/userDashboard/UserDashboard.jsx"));
const MyPosts = lazy(() => import("./pages/userDashboard/userControls/UserPosts.jsx"));
// const DashboardProfile = lazy(() => import("./pages/dashboard/Profile"));

function App() {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 transition-all duration-300">
                        <Header />
                        <main className="min-h-[calc(100vh-4rem)]">
                            <Suspense fallback={
                                <div className="min-h-screen flex items-center justify-center">
                                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-xl">
                                        <Loader />
                                    </div>
                                </div>
                            }>
                                <Routes>
                                    {/* Public Routes */}
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/forgot-password" element={<ForgetPassword />} />
                                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                                    <Route path="*" element={<NotFound />} />
                                    <Route path="/posts/:id" element={<PostDetails />} />
                                    <Route path="/lost-items-post" element={<LostPostItems />} />
                                    <Route path="/found-items-post" element={<FoundItemsPost />} />
                                    <Route path="/claim/:postId" element={<ClaimRequest />} />

                                    {/* Authenticated User Routes */}
                                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                                    <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
                                    <Route path="/edit-post/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
                                    <Route path="/chat/:userId" element={<PrivateRoute><Chat /></PrivateRoute>} />
                                    <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />

                                    {/* User Dashboard */}
                                    <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                                        <Route index element={<UserDashboard />} />
                                        <Route path="my-posts" element={<MyPosts />} />
                                        <Route path="my-claims" element={<GetMyClaims />} />
                                        <Route path="user-claims" element={<GetUserClaims />} />
                                        {/*<Route path="profile" element={<DashboardProfile />} />*/}
                                    </Route>

                                    {/* Admin Dashboard */}
                                    <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboardLayout /></AdminRoute>}>
                                        <Route index element={<AdminDashboard />} />
                                        <Route path="pending-posts" element={<PendingPosts />} />
                                        {/*<Route path="profile" element={<DashboardProfile />} />*/}
                                    </Route>
                                </Routes>
                            </Suspense>
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
