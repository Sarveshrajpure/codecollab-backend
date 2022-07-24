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
