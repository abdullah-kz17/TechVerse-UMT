// Load environment variables first
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors")
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

// Then import other modules
const express = require("express");
const connectDb = require("./config/db.js");
const compression = require("compression");

const authRoute = require("./routes/authRoutes.js")
const postRoute = require("./routes/postRoutes.js")
const claimRoute = require("./routes/claimRoutes.js")
const chatRoute = require("./routes/chatRoutes.js")

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Socket.IO connection handling
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
        return next(new Error('Authentication error'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join user's personal room
    socket.on('join', (userId) => {
        if (userId !== socket.userId) {
            return;
        }
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    // Handle private messages
    socket.on('private_message', (data) => {
        if (data.senderId !== socket.userId) {
            return;
        }
        // Emit to sender
        io.to(data.senderId).emit('receive_message', data);
        // Emit to receiver
        io.to(data.receiverId).emit('receive_message', data);
        // Emit notification to receiver
        io.to(data.receiverId).emit('new_message_notification', {
            type: 'new_message',
            senderId: data.senderId
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const errorHandler = require("./middlewares/errorMiddleware.js")
app.use(compression())
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}))
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
app.use("/api/chat", chatRoute)

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDb();
        server.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to database:", error.message);
        process.exit(1);
    }
};

startServer();