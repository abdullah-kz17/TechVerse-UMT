// Load environment variables first
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors")

// Then import other modules
const express = require("express");
const connectDb = require("./config/db.js");
const compression = require("compression");

const authRoute = require("./routes/authRoutes.js")
const postRoute = require("./routes/postRoutes.js")
const claimRoute = require("./routes/claimRoutes.js")



const app = express();

const errorHandler = require("./middlewares/errorMiddleware.js")
app.use(compression())
app.use(cors())
app.use(express.json())
// Optional error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err.message.includes('Only JPEG')) {
        return res.status(400).json({ message: err.message });
    }
    next(err);
});

app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)
app.use("/api/claim", claimRoute)

app.use(errorHandler);
const startServer = async () => {
    try {
        await connectDb();
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to database:", error.message);
        process.exit(1);
    }
};

startServer();