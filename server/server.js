const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public")
const port = process.env.PORT || 4222
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat room!",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "A user just joined in.",
    createdAt: new Date().getTime()
  });

  socket.on("createMessage", (message) => {
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   sentAt: new Date().getTime()
    // });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(port, () => {
  console.log("Successfully connected to localhost:4222");
});
