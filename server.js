const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: {
    origin: process.env.BASE_SOCKET_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

// Configure CORS to allow requests from the client-side origin
app.use(cors({ origin: process.env.BASE_SOCKET_URL }));

// Your Socket.IO server code goes here
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.join("rfid-room");

  socket.on("rfid-tap", (testData) => {
    socket.to("rfid-room").emit("read-rfid", testData);
  });

  // You can now listen for custom events or handle socket interactions
  // related to your API requests here.

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port = 3001;
httpServer.listen(port, () => {
  console.log(`Socket.IO server listening on http://localhost:${port}`);
});
