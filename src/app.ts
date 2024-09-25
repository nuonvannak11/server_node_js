import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import { config } from "dotenv";
import router from "./routes/mainRoutes";
import { Server } from "socket.io";
config();

const app = express();
const port = process.env.PORT_SERVER || 3000;

// CORS middleware configuration
app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:3005"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use(express.json());
app.use(router);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "Request timed out") {
    res.status(200).json({ code: -1, message: "Request timed out" });
  } else {
    res.status(200).json({ code: -1, message: "Invalid Data" });
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource does not exist.",
  });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3005", "http://localhost:4000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  },
});

// Attach Socket.io event listeners
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the server
server
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (error) => {
    console.error("Server failed to start:", error.message);
  });

export default app;
