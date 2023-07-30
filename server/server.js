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

const CONSTANTS = require("./constants/Constants");

//Socket io
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const socketIoPort = process.env.SOCKETPORT || 5000;

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return { socketId, userName: userSocketMap[socketId] };
  });
};

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  socket.on(CONSTANTS.SOCKET_ACTIONS.JOIN, ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(CONSTANTS.SOCKET_ACTIONS.JOINED, {
        clients,
        userName,
        socketId: socket.id,
      });
    });
  });

  socket.on(CONSTANTS.SOCKET_ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(CONSTANTS.SOCKET_ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(CONSTANTS.SOCKET_ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(CONSTANTS.SOCKET_ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(CONSTANTS.SOCKET_ACTIONS.SYNC_LANGUAGE, ({ socketId, lang }) => {
    io.to(socketId).emit(CONSTANTS.SOCKET_ACTIONS.LANGUAGE_CHANGE, {
      lang,
    });
  });

  socket.on(CONSTANTS.SOCKET_ACTIONS.LANGUAGE_CHANGE, ({ roomId, lang, userName }) => {
    io.to(roomId).emit(CONSTANTS.SOCKET_ACTIONS.LANGUAGE_CHANGE, {
      lang,
      userName,
    });
  });
  socket.on(CONSTANTS.SOCKET_ACTIONS.SYNC_OUTPUT, ({ socketId, output }) => {
    io.to(socketId).emit(CONSTANTS.SOCKET_ACTIONS.OUTPUT_CHANGE, {
      output,
    });
  });

  socket.on(CONSTANTS.SOCKET_ACTIONS.OUTPUT_CHANGE, ({ roomId, output, userName }) => {
    io.to(roomId).emit(CONSTANTS.SOCKET_ACTIONS.OUTPUT_CHANGE, {
      output,
      userName,
    });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];

    rooms.forEach((roomId) => {
      socket.in(roomId).emit(CONSTANTS.SOCKET_ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        userName: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

//MongoDb Connection
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

const connection = mongoose.connection;

app.set("trust proxy", 1);

// CORS
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: process.env.ORIGIN_FOR_CORS,
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: "*",
      methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Authorization", "Content-Type"],
      credentials: true,
    })
  );
}
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
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
