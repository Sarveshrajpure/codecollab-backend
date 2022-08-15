const express = require("express");
const workspaceController = require("../controllers/workspace.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/workspace/getall
router.post("/getall", auth(), workspaceController.getAll);

//api/workspace/create
router.post("/create", auth(), workspaceController.create);

//api/workspace/delete
router.post("/delete", auth(), workspaceController.delete);

module.exports = router;
