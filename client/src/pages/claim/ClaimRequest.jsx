// src/pages/ClaimForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createClaimRequest } from "../../store/thunks/claimThunk.js";
import { toast } from "react-toastify";

const ClaimForm = () => {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(createClaimRequest({
                postId,
                message,
                image
            })).unwrap();
            toast.success("Claim request submitted!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err?.message || "Failed to submit claim");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-blue-700 text-center">Claim Found Item</h2>

                <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="4"
                    placeholder="Enter a message to the finder"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload proof image (optional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Submit Claim
                </button>
            </form>
        </div>
    );
};

export default ClaimForm;
