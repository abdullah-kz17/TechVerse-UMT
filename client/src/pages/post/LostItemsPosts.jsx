import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import { toast } from "react-toastify";
import { getLostPosts } from "../../store/thunks/postThunk.js";

const LostPostItems = () => {
    const dispatch = useDispatch();
    const { lostPosts, loading, error } = useSelector((state) => state.post);

    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        dispatch(getLostPosts());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const filteredPosts = lostPosts.filter((post) => {
        const nameMatch = post.name.toLowerCase().includes(searchTerm.toLowerCase());

        const postDate = new Date(post.dateLostOrFound);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        const dateMatch =
            (!from || postDate >= from) &&
            (!to || postDate <= to);

        return nameMatch && dateMatch;
    });

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
            <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
                Lost Items
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 flex-wrap">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full md:w-[30%] px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <input
                    type="date"
                    className="w-full md:w-[20%] px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={fromDate}
                    onChange={(e) => {
                        setFromDate(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <input
                    type="date"
                    className="w-full md:w-[20%] px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={toDate}
                    onChange={(e) => {
                        setToDate(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {loading ? (
                <Loader />
            ) : paginatedPosts.length === 0 ? (
                <p className="text-center text-gray-600">No lost items found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                currentPage === i + 1
                                    ? "bg-blue-700 text-white"
                                    : "bg-white border border-blue-400 text-blue-600"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LostPostItems;
