const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const protect = require("../middlewares/authMiddleware");
const { upload } = require("../config/cloudinary.js");




router.post("/register", upload.single("profilePic"), authController.register);
router.post("/login", authController.login)
router.route("/update").put(protect, upload.single("profilePic"), authController.updateProfile);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/me", protect, authController.getCurrentUser)


module.exports = router