import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/thunks/postThunk.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import Input from "../../components/ui/Input";

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.post);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        type: "",
        description: "",
        location: "",
        dateLostOrFound: "",
        contactInfo: "",
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
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
                navigate("/"); // fallback
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
                    Create New Post
                </h2>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <Input
                        label="Item Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter item name"
                        required
                    />

                    <div className="w-full">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Documents">Documents</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">Lost or Found?</option>
                            <option value="lost">Lost</option>
                            <option value="found">Found</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Describe the item..."
                            value={formData.description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                    <label className="flex items-center gap-2 cursor-pointer text-blue-600 font-medium">
                        <FiUploadCloud className="text-xl" />
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        {image && (
                            <span className="text-sm text-gray-500">{image.name}</span>
                        )}
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-lg"
                    >
                        {loading ? "Submitting..." : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
