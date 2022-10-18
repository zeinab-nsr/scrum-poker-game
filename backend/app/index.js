const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require('body-parser');

function App() {
  const server = http.createServer(app);

  // configs
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // APIs

  server.listen(3002, () => {
    console.log("Server is running on port 3002");
  })

}

module.exports = App;
