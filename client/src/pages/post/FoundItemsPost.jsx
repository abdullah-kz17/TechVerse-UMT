import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoundPosts } from "../../store/thunks/postThunk";
import PostCard from "../../components/post/PostCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import { toast } from "react-toastify";

const FoundItemsPost = () => {
    const dispatch = useDispatch();
    const { foundPosts, loading, error } = useSelector((state) => state.post);
    console.log(foundPosts);

    useEffect(() => {
        dispatch(getFoundPosts());
    }, [dispatch]);

    {foundPosts.map((post) => <PostCard key={post._id} post={post} />)}


    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-6">
            <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">
                Found Items
            </h2>

            {loading ? (
                <Loader />
            ) : foundPosts.length === 0 ? (
                <p className="text-center text-gray-600">No found items available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {foundPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoundItemsPost;
