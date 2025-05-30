const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateToken = require("../config/generateToken")
const crypto = require('crypto')
const sendEmail = require("../config/sendEmail.js")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please input all fields",
                success: false,
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePicUrl = req.file ? req.file.path : null;

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePic: profilePicUrl,
        });

        await newUser.save();

        const token = generateToken(newUser);

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
                role: newUser.role,
            },
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            message: "Error registering user",
            success: false,
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter both email and password",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        const token = generateToken(user)


        // ✅ Success response
        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                isAdmin: user.isAdmin,
            },
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Server error during login",
            success: false,
        });
    }
};
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        const html = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">YourApp</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 30px;">
        <h2 style="color: #333333;">Password Reset Request</h2>
        <p style="color: #555555; line-height: 1.5;">
          Hello,<br/><br/>
          We received a request to reset your password. If this was you, click the button below to proceed. This link is valid for a limited time.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #4f46e5; color: #ffffff; padding: 14px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Reset Your Password
          </a>
        </div>

        <!-- Fallback URL -->
        <p style="font-size: 14px; color: #999999; line-height: 1.5;">
          If the button above doesn’t work, copy and paste the following link into your browser:
          <br/>
          <a href="${resetUrl}" style="color: #4f46e5; word-break: break-all;">${resetUrl}</a>
        </p>

        <p style="color: #999999; font-size: 12px; margin-top: 40px;">
          If you didn’t request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #888888;">
        &copy; ${new Date().getFullYear()} YourApp. All rights reserved.
      </div>
    </div>
  </div>
`;



        await sendEmail(user.email, "Password Reset", html);

        res.status(200).json({ message: "Email sent", success: true });

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
const resetPassword = async (req, res) => {
    try {
        const resetToken = req.params.token;
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successfully", success: true });

    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
const getCurrentUser = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};
const updateProfile = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = req.user._id;

        if (!username || !email) {
            return res.status(400).json({
                message: "Please input both username and email",
                success: false,
            });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Check if the email is already used by another user
        if (user.email !== email) {
            const userWithEmail = await User.findOne({ email });
            if (userWithEmail) {
                return res.status(400).json({
                    message: "Email is already taken by another user",
                    success: false,
                });
            }
        }

        // Handle password update
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        // Handle profile picture update (optional)
        const profilePicUrl = req.file ? req.file.path : null;
        if (profilePicUrl) {
            user.profilePic = profilePicUrl;
        }

        // Update user details
        user.username = username;
        user.email = email;

        // Save updated user data
        await user.save();

        // Send success response
        res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({
            message: "Error updating profile",
            success: false,
        });
    }
};


module.exports = {register,login,getCurrentUser,forgotPassword,resetPassword,updateProfile}