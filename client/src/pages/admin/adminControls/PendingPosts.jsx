import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingPosts, approvePost, deletePost } from '../../../store/thunks/postThunk.js';
import AdminPostsTable from "../../../components/post/AdminPostsTable.jsx";
import { toast } from 'react-toastify';

const AdminPosts = () => {
    const dispatch = useDispatch();
    const { pendingPosts, loading, error } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getPendingPosts());
    }, [dispatch]);

    const handleApprove = async (postId) => {
        try {
            await dispatch(approvePost(postId)).unwrap();
            toast.success('Post approved successfully!');
            dispatch(getPendingPosts());
        } catch (err) {
            toast.error(`Failed to approve post: ${err.message || err}`);
        }
    };

    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await dispatch(deletePost(postId)).unwrap();
                toast.success('Post deleted successfully!');
                dispatch(getPendingPosts()); // refresh list
            } catch (err) {
                toast.error(`Failed to delete post: ${err.message || err}`);
            }
        }
    };


    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Pending Posts (Admin)</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error.message || 'Something went wrong.'}</p>}
            <AdminPostsTable posts={pendingPosts} onApprove={handleApprove} onDelete={handleDelete} />
        </div>
    );
};

export default AdminPosts;
