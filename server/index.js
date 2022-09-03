const express = require("express");
const http = require("http");
const app = express();
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

const users = [];
const messages = {
  general: [],
  random: [],
  jokes: [],
  javascript: [],
}

io.on("connection", socket => {
  socket.on("join server", (username) => {
    const user = {
      username,
      id: socket.id,
    }
    users.push(user);
    io.emit("new user", users);
  });

  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName]);
  });

  socket.on("send message", ({content, to, sender, chatName, isChannel}) => {
    if (isChannel) {
      const payload = {
        content,
        chatName,
        sender,
      }
      socket.to(to).emit("new message", payload);
    } else {
      const payload = {
        content,
        chatName: sender,
        sender,
      }
    } 
    if (messages[chatName]) {
      messages[chatName].push ({
        sender,
        content
      })
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(u => u.id !== socket.io);
    io.emit("new user", users);
  });
});

app.listen(3000, () => {console.log('server is runnig on port 3000...')});
