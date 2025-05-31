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
            <div className="">
                <Header />
                <Suspense fallback={<div className=""><Loader /></div>}>
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
                <Footer />
            </div>
        </Router>
    );
}

export default App;
