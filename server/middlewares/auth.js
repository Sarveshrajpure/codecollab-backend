const jwt = require("jsonwebtoken");
require("dotenv").config();
const httpStatus = require("http-status");
const userService = require("../services/user.service");
const { ApiError } = require("./apiError");

const auth = () => async (req, res, next) => {
  try {
    let accessToken = req.cookies["x-access-token"];
    console.log(accessToken);

    if (!accessToken) {
      res.status(httpStatus.UNAUTHORIZED).send({ error: "Unauthorized user!" });
    }

    let validToken = await userService.validateToken(accessToken);

    if (validToken) {
      req.authenticated = validToken;
    }
    next();
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).send({ error: error });
  }
};

module.exports = auth;
