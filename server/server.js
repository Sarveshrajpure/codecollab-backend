const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongooseSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
require("dotenv").config();
const routes = require("./routes");
const { convertToApiError, handleError } = require("./middlewares/apiError");
const http = require("http");
const { Server } = require("socket.io");
const CONSTANTS = require("./constants/Constants");

//Socket io
const server = http.createServer(app);
const io = new Server(server);
const socketIoPort = process.env.SOCKETPORT || 5000;
server.listen(socketIoPort, () => {
  console.log(`Listening on port ${socketIoPort} for socket connections`);
});

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return { socketId, userName: userSocketMap[socketId] };
    }
  );
};
io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);
  socket.on(CONSTANTS.SOCKET_ACTIONS.JOIN, ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomId);

    let clients = getAllConnectedClients(roomId);

    clients.forEach((socketId) => {
      io.to(socketId).emit(
        CONSTANTS.SOCKET_ACTIONS.JOINED,
        {
          clients,
          userName,
          socketId: socket.id,
        },
        console.log("joined emitted")
      );
    });
  });
});

//MongoDb Connection
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

const connection = mongoose.connection;

//CORS
app.use(cors());

//BODY PARSER
app.use(express.json());

//COOKIE-PARSER
app.use(cookieParser());

//SANITIZE JSON
app.use(xss());
app.use(mongooseSanitize());

//CONFIG FOR IMAGE UPLOAD
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//ROUTES
app.use("/api", routes);

//API ERROR HANDLING
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
