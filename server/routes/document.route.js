const express = require("express");
const documentController = require("../controllers/document.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/document/create
router.post("/create", auth(), documentController.create);

//api/document/create
//router.post("/delete", compilerController.compile);

module.exports = router;
