const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/Constants");
Joi.objectId = require("joi-objectid")(Joi);

const createWorkspaceSchema = Joi.object({
  name: Joi.string().min(4).max(100).required("Workspace name required"),
  userId: Joi.objectId().required(),
});

const deleteWorkspaceSchema = Joi.object({
  workspaceId: Joi.objectId().required(),
});
module.exports = {
  createWorkspaceSchema,
  deleteWorkspaceSchema,
};
