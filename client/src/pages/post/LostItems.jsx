import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageSimilaritySearch from '../../components/imageSimilarity/ImageSimilaritySearch';
import PostCard from '../../components/post/PostCard';
import { getLostPosts, getFoundPosts } from '../../store/thunks/postThunk';

const LostItems = () => {
    const dispatch = useDispatch();
    const { lostPosts, foundPosts, loading, error } = useSelector((state) => state.post);
    const [searchTerm, setSearchTerm] = useState('');
    const [showImageSearch, setShowImageSearch] = useState(false);

    useEffect(() => {
        dispatch(getLostPosts());
        dispatch(getFoundPosts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Filter lost posts by search term and ensure they have type 'lost'
    const filteredPosts = (lostPosts || []).filter(post =>
        post.type === 'lost' &&
        (post.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         post.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
                        Lost Items
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowImageSearch(!showImageSearch)}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            <FaSearch className="mr-2" />
                            {showImageSearch ? 'Hide Image Search' : 'Search by Image'}
                        </button>
                        <Link
                            to="/create-post"
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            <FaPlus className="mr-2" />
                            Report Lost Item
                        </Link>
                    </div>
                </div>

                {/* Image Similarity Search */}
                {showImageSearch && (
                    <div className="mb-8">
                        <ImageSimilaritySearch foundItems={foundPosts || []} />
                    </div>
                )}

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search lost items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* No Results */}
                {!loading && filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No lost items found matching your search.
                        </p>
                    </div>
                )}

                {/* Posts Grid */}
                {!loading && filteredPosts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LostItems;
