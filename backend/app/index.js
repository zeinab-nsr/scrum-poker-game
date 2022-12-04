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
  let scores = [];

  // socket events
  io.on("connection", socket => { // socket instance

    socket.on("join room", (username) => {
      const user = {
        username,
        id: socket.id,
        voted: false,
      }
      users.push(user);
      io.emit("updated users", users);
      io.emit("get id", socket.id);
    });

    socket.on("disconnect", () => {
      users = users.filter(u => u.id !== socket.id);
      io.emit("updated users", users);
    });

    socket.on("add score", ({score, userId}) => {
      const scoreItem = {
        score,
        userId,
      }
      const i = scores.findIndex(item => item.userId === scoreItem.userId);
      if (i > -1) scores[i] = scoreItem;
      else scores.push(scoreItem);

      users.map(user => {
        if (user.id === userId) user.voted = true;
      })
      io.emit("updated users", users);

      let avg = 0;
      if(scores.length === users.length) {
        const numericalScores = scores.filter(item => item.score !== '?')
        avg = numericalScores.reduce((sum, item) => sum + item.score, 0) / numericalScores.length;
        io.emit("average", avg);
      }
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
//     io.emit("updated users", users);
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