const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const {
  createDocuemntSchema,
  getAllDocumentsSchema,
  getOneDocumentSchema,
  deleteDocuemntSchema,
  deleteManyDocuemntSchema,
  updateDocumentSchema,
  updateDocumentNameSchema,
} = require("../validations/documentValidation");
const btoa = require("btoa");
const { documentService } = require("../services");

const documentController = {
  async create(req, res, next) {
    try {
      let value = await createDocuemntSchema.validateAsync(req.body);

      let checkDocumentName = await documentService.checkDocumentName(
        value.fileName,
        value.fileExtension
      );

      if (checkDocumentName === null) {
        let createDocument = await documentService.createDocument(
          value.fileName,
          value.fileContent,
          value.fileExtension,
          value.workspaceId
        );

        res.status(httpStatus.CREATED).send(createDocument);
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Document already exists!" });
      }
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      let value = await getAllDocumentsSchema.validateAsync(req.body);

      let getAllDocumentsByWorspaceId = await documentService.getAllDocuments(
        value.workspaceId
      );

      if (getAllDocumentsByWorspaceId) {
        res.status(httpStatus.OK).send(getAllDocumentsByWorspaceId);
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .send("No documents found for this workspace");
      }
    } catch (error) {
      next(error);
    }
  },
  async getOne(req, res, next) {
    try {
      let value = await getOneDocumentSchema.validateAsync(req.body);

      let getOneDocumentsByDocumentId = await documentService.getOneDocument(
        value.documentId
      );

      if (getOneDocumentsByDocumentId) {
        res.status(httpStatus.OK).send(getOneDocumentsByDocumentId);
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .send("No documents found for this workspace");
      }
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      let value = await updateDocumentSchema.validateAsync(req.body);

      let updateDocument = await documentService.updateDocument(
        value.documentId,
        value.fileContent
      );
      if (updateDocument) {
        res.status(httpStatus.OK).send({ message: "Document updated!" });
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Document does not exist!" });
      }
    } catch (error) {
      next(error);
    }
  },

  async UpdateName(req, res, next) {
    try {
      let value = await updateDocumentNameSchema.validateAsync(req.body);

      let checkName = await documentService.checkDocumentName(
        value.newName,
        value.fileExtension
      );
      console.log(checkName);
      if (checkName === null) {
        let updateDocumentName = await documentService.updateDocumentName(
          value.documentId,
          value.newName
        );

        res.status(httpStatus.OK).send({
          message: `File name updated successfully updated to ${value.newName}!`,
        });
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: " A document already exists by this name!" });
      }
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      let value = await deleteDocuemntSchema.validateAsync(req.body);

      let deleteDocument = await documentService.deleteDocument(
        value.documentId
      );

      if (deleteDocument > 0) {
        res
          .status(httpStatus.OK)
          .send({ message: "Document deleted successfully!" });
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Document does not exist!" });
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteMany(req, res, next) {
    try {
      console.log("in controller");
      let value = await deleteManyDocuemntSchema.validateAsync(req.body);

      let deleteManyDocuments = await documentService.deleteBlukDocument(
        value.workspaceId
      );

      if (deleteManyDocuments > 0) {
        res.status(httpStatus.OK).send({
          message: `Documents deleted successfully!, delete count:${deleteManyDocuments}`,
        });
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Documents do not exist fro this workspace" });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = documentController;
