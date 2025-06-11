import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoundPosts } from "../../store/thunks/postThunk";
import PostCard from "../../components/post/PostCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import { toast } from "react-toastify";

const FoundItemsPost = () => {
    const dispatch = useDispatch();
    const { foundPosts, loading, error } = useSelector((state) => state.post);

    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        dispatch(getFoundPosts());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const filteredPosts = foundPosts.filter((post) => {
        const nameMatch = post.name?.toLowerCase().includes(searchTerm.toLowerCase());

        const postDate = post.dateLostOrFound ? new Date(post.dateLostOrFound) : null;
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        const dateMatch =
            (!from || (postDate && postDate >= from)) &&
            (!to || (postDate && postDate <= to));

        return nameMatch && dateMatch;
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-6 transition-all">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8">
                    Found Items
                </h2>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search by item name..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full md:w-[30%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => {
                            setFromDate(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full md:w-[20%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => {
                            setToDate(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full md:w-[20%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                {/* Content */}
                {loading ? (
                    <Loader />
                ) : filteredPosts.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No found items match your search or filter.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentPosts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-8">
                            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => handlePageChange(number)}
                                        className={`px-4 py-2 border text-sm font-medium ${
                                            currentPage === number
                                                ? "bg-green-600 text-white border-green-600"
                                                : "bg-white text-green-700 border-gray-300 hover:bg-green-100"
                                        }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FoundItemsPost;
