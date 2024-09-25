"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
const socket_io_1 = require("socket.io");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT_SERVER || 3000;
// CORS middleware configuration
app.use((0, cors_1.default)({
    origin: ["http://localhost:4000", "http://localhost:3005"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
}));
app.use(express_1.default.json());
app.use(mainRoutes_1.default);
// Global error handler
app.use((err, req, res, next) => {
    if (err.message === "Request timed out") {
        res.status(200).json({ code: -1, message: "Request timed out" });
    }
    else {
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
const server = http_1.default.createServer(app);
// Initialize Socket.io server with CORS configuration
const io = new socket_io_1.Server(server, {
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
exports.default = app;
