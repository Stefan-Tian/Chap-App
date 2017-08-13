const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public")
const port = process.env.PORT || 4222
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat room"));

  socket.broadcast.emit("newMessage", generateMessage("Admin", "A user just joined in"));

  socket.on("createMessage", (message) => {
    io.emit("newMessage", generateMessage(message.from, message.text));
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
