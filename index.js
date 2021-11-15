require("dotenv").config();
const express = require("express");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

// Get routes to the variabel
const router = require("./src/routes");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.PATH_FRONTEND,
  },
});

const port = 4000;

app.use(express.json());
app.use(cors());

// static folder uploads
app.use("/uploads", express.static("uploads"));

// Add endpoint grouping and router
app.use("/api/v1/", router);

server.listen(port, () =>
  console.log(`Listening on http://localhost:${port}!`)
);
