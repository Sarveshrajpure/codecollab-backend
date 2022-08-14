const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/Constants");
Joi.objectId = require("joi-objectid")(Joi);

const createDocuemntSchema = Joi.object({
  fileName: Joi.string().min(4).max(100).required("Document name required"),
  fileContent: Joi.string(),
  fileExtension: Joi.string()
    .min(1)
    .max(50)
    .required("File extension required"),
  workspaceId: Joi.objectId().required(),
  userId: Joi.objectId().required(),
});

const getAllDocumentsByWorkspaceIdSchema = Joi.object({
  workspaceId: Joi.objectId().required(),
});

const getAllDocumentsByUserIdSchema = Joi.object({
  userId: Joi.objectId().required(),
});

const getOneDocumentSchema = Joi.object({
  documentId: Joi.objectId().required(),
});
const updateDocumentSchema = Joi.object({
  documentId: Joi.objectId().required(),
  fileContent: Joi.string(),
});

const updateDocumentNameSchema = Joi.object({
  documentId: Joi.objectId().required(),
  newName: Joi.string().max(100),
  fileExtension: Joi.string()
    .min(1)
    .max(50)
    .required("File extension required"),
});

const deleteDocuemntSchema = Joi.object({
  documentId: Joi.objectId().required(),
});

const deleteManyDocuemntSchema = Joi.object({
  workspaceId: Joi.objectId().required(),
});

module.exports = {
  createDocuemntSchema,
  getAllDocumentsByWorkspaceIdSchema,
  getAllDocumentsByUserIdSchema,
  getOneDocumentSchema,
  updateDocumentSchema,
  updateDocumentNameSchema,
  deleteDocuemntSchema,
  deleteManyDocuemntSchema,
};
