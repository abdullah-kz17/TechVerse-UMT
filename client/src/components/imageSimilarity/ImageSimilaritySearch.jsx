import React, { useState, useRef } from 'react';
import { findSimilarImages } from '../../utils/imageSimilarity';
import { FaUpload, FaSpinner, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ImageSimilaritySearch = ({ foundItems }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [similarItems, setSimilarItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Image size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSearch = async () => {
        if (!selectedImage) {
            toast.error('Please upload an image first');
            return;
        }

        setIsLoading(true);
        try {
            // Create image elements for comparison
            const queryImg = new Image();
            queryImg.src = selectedImage;

            const candidateImages = foundItems.map(item => {
                const img = new Image();
                img.src = item.image;
                return img;
            });

            // Wait for images to load
            await Promise.all([
                new Promise(resolve => queryImg.onload = resolve),
                ...candidateImages.map(img => new Promise(resolve => img.onload = resolve))
            ]);

            // Find similar images
            const similarResults = await findSimilarImages(queryImg, candidateImages);
            
            // Map results back to found items
            const similarFoundItems = similarResults.map(result => {
                const index = candidateImages.findIndex(img => img.src === result.image.src);
                return {
                    ...foundItems[index],
                    similarity: result.similarity
                };
            });

            setSimilarItems(similarFoundItems);
            
            if (similarFoundItems.length === 0) {
                toast.info('No similar items found');
            }
        } catch (error) {
            console.error('Error finding similar images:', error);
            toast.error('Error finding similar images');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Find Similar Items
                </h2>

                {/* Image Upload Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-center w-full">
                        <label
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-h-48 rounded-lg"
                                    />
                                ) : (
                                    <>
                                        <FaUpload className="w-10 h-10 mb-3 text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG or JPEG (MAX. 5MB)
                                        </p>
                                    </>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={handleSearch}
                        disabled={!selectedImage || isLoading}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? (
                            <FaSpinner className="animate-spin mr-2" />
                        ) : (
                            <FaSearch className="mr-2" />
                        )}
                        {isLoading ? 'Searching...' : 'Find Similar Items'}
                    </button>
                </div>

                {/* Results Section */}
                {similarItems.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            Similar Items Found
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {similarItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {item.description}
                                        </p>
                                        <div className="mt-2">
                                            <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                                                {Math.round(item.similarity * 100)}% Match
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageSimilaritySearch; 