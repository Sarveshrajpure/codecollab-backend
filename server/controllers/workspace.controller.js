const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { workspaceService, documentService } = require("../services");
const {
  createWorkspaceSchema,
  deleteWorkspaceSchema,
} = require("../validations/workspaceValidations");

const workspaceController = {
  async create(req, res, next) {
    try {
      let value = await createWorkspaceSchema.validateAsync(req.body);

      let checkForDuplicateName = await workspaceService.checkWorkspaceName(
        value.name
      );
      if (!checkForDuplicateName) {
        //checkForDuplicateName returns a document if a workspace namw already exists
        let createWorkspace = await workspaceService.createWorkspace(
          value.name,
          value.userId
        );
        res.status(httpStatus.CREATED).send(createWorkspace);
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "workspace name alredy exists" });
      }
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      let value = await deleteWorkspaceSchema.validateAsync(req.body);
      let response = { message1: "", message2: "" };
      //Deleting all documents of worspace before deleting workspace

      let deleteAllDocuments = await documentService.deleteBlukDocument(
        value.workspaceId
      );

      if (deleteAllDocuments > 0) {
        response.message2 = `Documents deleted for this workpace:${deleteAllDocuments}`;
      } else {
        response.message2 = `No documents to delete for this workspace`;
      }

      let deleteWorkspace = await workspaceService.deleteWorkspace(
        value.workspaceId
      );

      if (deleteWorkspace > 0) {
        response.message1 = `Workspace deleted`;
        res.status(httpStatus.OK).send(response);
      } else {
        response.message1 = `Workspace does not exist!`;
        res.status(httpStatus.BAD_REQUEST).send(response);
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = workspaceController;
