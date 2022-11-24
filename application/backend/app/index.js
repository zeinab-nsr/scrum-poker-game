const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const bodyParser = require('body-parser');

const registerUserHandler = require('./userHandler');

function App() {
  // configs
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // register socket events
  const onConnection = (socket) => {
    registerUserHandler(io, socket);
  }
  io.on("connection", onConnection);

  // APIs
  httpServer.listen(3002, () => {
    console.log("Server is running on port: 3002");
  })
}

module.exports = App;