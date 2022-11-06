const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const bodyParser = require('body-parser');

function App() {
  // configs
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // constants
  let users = [];

  // socket events
  io.on("connection", socket => { // socket instance

    socket.on("join room", (username) => {
      const user = {
        username,
        id: socket.id,
      }
      users.push(user);
      console.log('users', users);
      io.emit("new user", users);
    });

    socket.on("disconnect", () => {
      users = users.filter(u => u.id !== socket.id);
      io.emit("new user", users);
    });

  });

  // APIs
  httpServer.listen(3002, () => {
    console.log("Server is running on port: 3002");
  })
}

module.exports = App;

// io.on("connection", socket => {
//   socket.on("join server", (username) => {
//     const user = {
//       username,
//       id: socket.id,
//     }
//     users.push(user);
//     io.emit("new user", users);
//   });

//   socket.on("join room", (roomName, cb) => {
//     socket.join(roomName);
//     cb(messages[roomName]);
//   });

//   socket.on("send message", ({content, to, sender, chatName, isChannel}) => {
//     if (isChannel) {
//       const payload = {
//         content,
//         chatName,
//         sender,
//       }
//       socket.to(to).emit("new message", payload);
//     } else {
//       const payload = {
//         content,
//         chatName: sender,
//         sender,
//       }
//     } 
//     if (messages[chatName]) {
//       messages[chatName].push ({
//         sender,
//         content
//       })
//     }
//   });
// });