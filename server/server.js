const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const routes = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 4001;
const API_KEY = process.env.API_KEY;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(function(req, res, next) {
  req.io = io;
  next();
});
app.use(routes);

let interval;

const getApiAndEmit = async socket => {
  const count = Math.round(Math.random() * 10);
  socket.emit("message", count);
  console.log("emited");
};

io.on("connection", (socket, token) => {
  console.log("New client connected");
  socket.on("sign-in", e => {
    console.log(e);
  });
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
