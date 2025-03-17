import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import routes from "./routes";
import { Message } from "./models/Message";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads and downloads directory
app.use("/uploads", express.static("uploads"));
app.use("/downloads", express.static("downloads"));

// Routes
app.use("/api", routes);

// Socket.IO connection handling
const userSockets = new Map<string, string>(); // userId -> socketId

io.on("connection", (socket) => {
  console.log("New socket connection");

  // Authenticate user and store their socket
  socket.on("authenticate", async (token: string) => {
    try {
      // Verify token and get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      const userId = decoded.userId;

      console.log("Socket authenticated for user:", userId);

      // Store socket mapping and join room
      userSockets.set(userId, socket.id);
      socket.join(userId);

      // Emit authentication success
      socket.emit("authenticated");
    } catch (error) {
      console.error("Socket authentication error:", error);
      socket.emit("auth_error", "Authentication failed");
    }
  });

  // Handle new messages
  socket.on(
    "send_message",
    async (data: { sender: string; receiver: string; content: string }) => {
      try {
        console.log("New message received:", data);

        const message = new Message({
          sender: data.sender,
          receiver: data.receiver,
          content: data.content,
        });
        await message.save();
        await message.populate("sender receiver", "username");

        console.log("Message saved and populated:", message);

        // Emit to both sender and receiver
        io.to(data.sender).to(data.receiver).emit("new_message", message);
        console.log("Message emitted to rooms:", data.sender, data.receiver);
      } catch (error) {
        console.error("Socket message error:", error);
        socket.emit("message_error", "Failed to send message");
      }
    }
  );

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
    // Remove user from userSockets map
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        console.log("User removed from socket mapping:", userId);
        break;
      }
    }
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
