import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, updatePost } from "../../store/thunks/postThunk";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";
import Input from "../../components/ui/Input";
import Loader from "../../components/common/Loader.jsx";

const EditPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get postId from URL

    const { posts, loading, error } = useSelector((state) => state.post);
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        type: "",
        description: "",
        location: "",
        dateLostOrFound: "",
        contactInfo: "",
    });

    useEffect(() => {
        dispatch(getPostById(id));
    }, [dispatch, id]);

    useEffect(() => {
        const post = posts.find((p) => p._id === id);
        if (post) {
            setFormData({
                name: post.name,
                category: post.category,
                type: post.type,
                description: post.description,
                location: post.location,
                dateLostOrFound: post.dateLostOrFound?.substring(0, 10),
                contactInfo: post.contactInfo,
            });
            setPreviewUrl(post.imageUrl);
        }
    }, [posts, id]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value);
        });
        if (image) {
            payload.append("imageUrl", image);
        }

        try {
            await dispatch(updatePost({ postId: id, updatedData: payload })).unwrap();
            toast.success("Post updated successfully");
            navigate("/posts");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update post");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 p-6 flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-semibold text-center text-yellow-700 mb-6">
                    Edit Post
                </h2>

                {loading ? (
                    <Loader />
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <Input
                            label="Item Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter item name"
                            required
                        />

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Documents">Documents</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            >
                                <option value="">Lost or Found?</option>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the item..."
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            ></textarea>
                        </div>

                        <Input
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter location"
                            required
                        />

                        <Input
                            label="Date Lost or Found"
                            name="dateLostOrFound"
                            type="date"
                            value={formData.dateLostOrFound}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Contact Info"
                            name="contactInfo"
                            value={formData.contactInfo}
                            onChange={handleChange}
                            placeholder="Phone or email"
                            required
                        />

                        <label className="flex items-center gap-2 cursor-pointer text-yellow-600 font-medium">
                            <FiUploadCloud className="text-xl" />
                            Upload New Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            {image && <span className="text-sm text-gray-500">{image.name}</span>}
                        </label>

                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-md shadow-md border"
                            />
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md shadow-lg"
                        >
                            {loading ? "Updating..." : "Update Post"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditPost;
