export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log(`[${new Date().toISOString()}] User connected: ${socket.id}`);

    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); // broadcast to all users
    });

    socket.on("disconnect", () => {
      console.log(`[${new Date().toISOString()}] User disconnected: ${socket.id}`);
    });
  });
};

