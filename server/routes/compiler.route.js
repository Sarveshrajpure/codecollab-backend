const express = require("express");
const compilerController = require("../controllers/compiler.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/compiler/compile
router.post("/compile", compilerController.compile);

module.exports = router;
