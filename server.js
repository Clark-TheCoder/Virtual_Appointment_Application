import { configDotenv } from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import { Server as SocketIOServer } from "socket.io";

// Get .env variables
configDotenv();

const app = express();
const server = http.createServer(app);

// Middleware (before routes)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Routes
app.get("/", (req, res) => {
  res.render("provider/landingPage");
});

// Modular routes
import authRoutes from "./routes/authRoute.js";
import callRoutes from "./routes/callsRoute.js";
import userRoutes from "./routes/providerRoute.js";

app.use("/auth", authRoutes);
app.use("/call", callRoutes);
app.use("/user", userRoutes);

// Setup Socket.IO
const io = new SocketIOServer(server);
io.on("connection", (socket) => {
  console.log("A user connected to the socket.");
  socket.on("join-call", ({ roomId }) => {
    console.log(`A user joined call: ${roomId}`);
    socket.join(roomId);
    socket.roomId = roomId;
    socket.to(roomId).emit("user-joined");
  });
  socket.on("offer", ({ roomId, sdp }) => {
    console.log("Got offer");
    io.to(roomId).emit("offer", { sdp });
  });
  socket.on("answer", ({ roomId, sdp }) => {
    console.log("Offering answer");
    io.to(roomId).emit("answer", { sdp });
  });
  socket.on("ice-candidate", ({ roomId, candidate }) => {
    console.log("Got ICE candidate for room:", roomId);
    socket.to(roomId).emit("ice-candidate", { candidate });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
