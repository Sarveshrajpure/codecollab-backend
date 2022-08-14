const express = require("express");
const documentController = require("../controllers/document.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/document/getallbyworkspaceid
router.get(
  "/getallbyworkspaceid",
  auth(),
  documentController.getAllByWorkspaceId
);

//api/document/getallbyuserid
router.get("/getallbyuserid", auth(), documentController.getAllByUserId);

//api/document/getone
router.get("/getone", auth(), documentController.getOne);

//api/document/create
router.post("/create", auth(), documentController.create);

//api/document/update
router.put("/updatecontent", auth(), documentController.update);

//api/document/updateDocumentName
router.put("/updatedocname", auth(), documentController.UpdateName);

//api/document/delete
router.delete("/delete", auth(), documentController.delete);

//api/document/deleteMany
router.delete("/deletemany", auth(), documentController.deleteMany);

module.exports = router;
