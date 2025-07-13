import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routers from "./routes/routes.js";
import dbCon from "./utlis/db.js";
import authRoutes from "./routes/auth.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
dbCon();

app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use("/api", routers);
app.use("/auth", authRoutes);
app.use("/api/complaint", complaintRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://192.168.70.91:3000", // Match your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

// Socket.IO connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

    // Example custom event for real-time notification
    socket.on("sendNotification", (data) => {
        console.log("Notification received:", data);
        io.emit("notification", data); // Broadcast to all connected clients
    });
});
export { io };
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
