import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import { toast } from "react-toastify";
import { getLostPosts } from "../../store/thunks/postThunk.js";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const LostPostItems = () => {
    const dispatch = useDispatch();
    const { lostPosts, loading, error } = useSelector((state) => state.post);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState({
        start: "",
        end: ""
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        dispatch(getLostPosts());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    // Filter posts based on search query and date range
    const filteredPosts = lostPosts.filter(post => {
        const matchesSearch = post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Date range filter based on post creation time
        let matchesDate = true;
        if (dateRange.start && dateRange.end) {
            const postDate = new Date(post.createdAt);
            const startDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);
            matchesDate = postDate >= startDate && postDate <= endDate;
        }

        return matchesSearch && matchesDate;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, dateRange]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        pages.push(
            <button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
            >
                <FaChevronLeft />
            </button>
        );

        // First page
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-1 rounded-md bg-white text-blue-600 hover:bg-blue-50"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(<span key="dots1" className="px-2">...</span>);
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-md ${
                        currentPage === i
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-blue-600 hover:bg-blue-50'
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="dots2" className="px-2">...</span>);
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-1 rounded-md bg-white text-blue-600 hover:bg-blue-50"
                >
                    {totalPages}
                </button>
            );
        }

        // Next button
        pages.push(
            <button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
            >
                <FaChevronRight />
            </button>
        );

        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
            <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
                Lost Items
            </h2>

            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto mb-8 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by item name or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                {/* Date Range Filter */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-medium text-gray-700 mb-3">Filter by Posted Date</h3>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm text-gray-600 mb-1">From</label>
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm text-gray-600 mb-1">To</label>
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : filteredPosts.length === 0 ? (
                <p className="text-center text-gray-600">
                    {lostPosts.length === 0
                        ? "No lost items found."
                        : "No items match your search criteria."}
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentPosts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center items-center gap-2">
                            {renderPagination()}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LostPostItems;
