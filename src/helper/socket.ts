import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { io };

  
 