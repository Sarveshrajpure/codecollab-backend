const express = require("express");
const documentController = require("../controllers/document.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/document/getallbyworkspaceid
router.post(
  "/getallbyworkspaceid",
  auth(),
  documentController.getAllByWorkspaceId
);

//api/document/getallbyuserid
router.post("/getallbyuserid", auth(), documentController.getAllByUserId);

//api/document/getone
router.post("/getone", auth(), documentController.getOne);

//api/document/create
router.post("/create", auth(), documentController.create);

//api/document/updatecontent
router.put("/updatecontent", auth(), documentController.update);

//api/document/updateDocumentName
router.put("/updatedocname", auth(), documentController.UpdateName);

//api/document/delete
router.post("/delete", auth(), documentController.delete);

//api/document/deleteMany
router.delete("/deletemany", auth(), documentController.deleteMany);

module.exports = router;
