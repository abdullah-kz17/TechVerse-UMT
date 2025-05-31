import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, deletePost } from "../../../store/thunks/postThunk.js";
import UserPostsTable from "../../../components/post/UserPostsTable.jsx";
import {toast} from "react-toastify";

const UserPosts = () => {
    const dispatch = useDispatch();
    const { myPosts, loading, error } = useSelector((state) => state.post);
    console.log("my posts", myPosts);

    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleDelete = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(deletePost(postId))
                .unwrap()
                .then(() => toast.success("Post deleted successfully"))
                .catch((err) => toast.error(err));
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">All User Posts</h2>
            {loading ? (
                <p className="text-center text-blue-600 font-medium">Loading...</p>
            ) : (
                <UserPostsTable posts={myPosts} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default UserPosts;
