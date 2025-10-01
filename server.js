import { configDotenv } from "dotenv";
import express from "express";
import http from "http";
import path from "path";

// Get .env variables
configDotenv();

const app = express();
const server = http.createServer(app);

// Serve static files from public folder
app.use(express.static("public"));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Route
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

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
