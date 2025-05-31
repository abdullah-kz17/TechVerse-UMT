// src/pages/PostDetailsPage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../store/thunks/postThunk";
import PostDetail from "../../components/post/PostDetail";

const PostDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedPost, loading, error } = useSelector((state) => state.post);

    console.log('🧾 Params:', id);
    console.log('🗂️ Selected Post:', selectedPost);


    useEffect(() => {
        if (id) {
            dispatch(getPostById(id));
        }
    }, [dispatch, id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-4">
            {loading ? (
                <p className="text-center text-lg font-semibold text-blue-700">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <PostDetail post={selectedPost} />
            )}
        </div>
    );
};

export default PostDetailsPage;
