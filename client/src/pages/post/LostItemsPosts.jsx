import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import { toast } from "react-toastify";
import {getLostPosts} from "../../store/thunks/postThunk.js";

const LostPostItems = () => {
    const dispatch = useDispatch();
    const { lostPosts, loading, error } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getLostPosts());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
            <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
                Lost Items
            </h2>

            {loading ? (
                <Loader />
            ) : lostPosts.length === 0 ? (
                <p className="text-center text-gray-600">No lost items found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lostPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LostPostItems;
