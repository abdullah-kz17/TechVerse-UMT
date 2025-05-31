import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/thunks/postThunk.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiImage, FiX } from "react-icons/fi";
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.post);
    const { isDarkMode } = useTheme();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        type: "",
        description: "",
        location: "",
        dateLostOrFound: "",
        contactInfo: "",
        postedBy: user?.username || "",
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return toast.error("Image is required");

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value);
        });
        payload.append("imageUrl", image);

        try {
            await dispatch(createPost(payload)).unwrap();
            toast.success("Post created successfully");
            if (formData.type === "lost") {
                navigate("/lost-items-post");
            } else if (formData.type === "found") {
                navigate("/found-items-post");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <div className={`min-h-screen transition-all duration-300 ${
            isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800' 
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        } p-4 sm:p-6 lg:p-8`}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-3xl sm:text-4xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Create New Post
                    </h1>
                    <p className={`mt-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Help others find their lost items or report found items
                    </p>
                    <p className={`mt-1 text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        Posted by: {user?.username || 'Anonymous'}
                    </p>
                </div>

                {/* Main Form Card */}
                <div className={`rounded-2xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/80 border-gray-700' 
                        : 'bg-white/80 border-white'
                }`}>
                    <div className="p-6 sm:p-8 lg:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Form Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Item Name */}
                                    <div className="space-y-2">
                                        <label className={`block text-sm font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Item Name *
                                        </label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter item name"
                                            required
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                                isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' 
                                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                                            }`}
                                        />
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2">
                                        <label className={`block text-sm font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Category *
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                                isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/20' 
                                                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                                            }`}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Documents">Documents</option>
                                            <option value="Accessories">Accessories</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    {/* Type */}
                                    <div className="space-y-2">
                                        <label className={`block text-sm font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Type *
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['lost', 'found'].map((type) => (
                                                <label
                                                    key={type}
                                                    className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                                        formData.type === type
                                                            ? isDarkMode
                                                                ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                                                                : 'border-blue-500 bg-blue-50 text-blue-700'
                                                            : isDarkMode
                                                                ? 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                                                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        value={type}
                                                        checked={formData.type === type}
                                                        onChange={handleChange}
                                                        className="sr-only"
                                                    />
                                                    <span className="font-medium capitalize">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-2">
                                        <label className={`block text-sm font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Location *
                                        </label>
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Enter location"
                                            required
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                                isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' 
                                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                                            }`}
                                        />
                                    </div>

                                    {/* Date */}
                                    <div className="space-y-2">
                                        <label className={`block text-sm font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Date Lost or Found *
                                        </label>
                                        <input
                                            name="dateLostOrFound"
                                            type="date"
                                            value={formData.dateLostOrFound}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                                isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/20' 
                                                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                                            }`}
                                        />
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-2">
                                        <label className={`block text-sm font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Contact Info *
                                        </label>
                                        <input
                                            name="contactInfo"
                                            value={formData.contactInfo}
                                            onChange={handleChange}
                                            placeholder="Phone or email"
                                            required
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                                isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' 
                                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                                            }`}
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Description */}
                                    <div className="space-y-2">
                                        <label className={`block text-sm font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Description *
                                        </label>
                                        <textarea
                                            name="description"
                                            rows="6"
                                            placeholder="Describe the item in detail..."
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 resize-none ${
                                                isDarkMode 
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' 
                                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                                            }`}
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div className="space-y-2">
                                        <label className={`block text-sm font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`}>
                                            Item Image *
                                        </label>
                                        
                                        {!imagePreview ? (
                                            <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                                                isDarkMode 
                                                    ? 'border-gray-600 bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                                                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600'
                                            }`}>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <FiUploadCloud className="w-10 h-10 mb-3 text-blue-500" />
                                                    <p className="mb-2 text-sm font-medium">
                                                        <span className="text-blue-500">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs">PNG, JPG, JPEG (MAX. 5MB)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        ) : (
                                            <div className="relative">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-40 object-cover rounded-xl"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    <FiX size={16} />
                                                </button>
                                                <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-md text-xs font-medium ${
                                                    isDarkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-gray-900'
                                                }`}>
                                                    <FiImage className="inline mr-1" />
                                                    {image?.name}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-200 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Creating Post...
                                        </div>
                                    ) : (
                                        "Create Post"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;