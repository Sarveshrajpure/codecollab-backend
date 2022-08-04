const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/Constants");
Joi.objectId = require("joi-objectid")(Joi);

const noWhiteSpaceError = new Error("No white spaces allowed!");
const getAllWorkspacesSchema = Joi.object({
  userId: Joi.objectId().required(),
});

const createWorkspaceSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(100)
    .regex(CONSTANTS.APP_VALIDATIONS.noWhiteSpaces)
    .error(noWhiteSpaceError)
    .required("Workspace name required"),
  userId: Joi.objectId().required(),
});

const deleteWorkspaceSchema = Joi.object({
  workspaceId: Joi.objectId().required(),
});
module.exports = {
  getAllWorkspacesSchema,
  createWorkspaceSchema,
  deleteWorkspaceSchema,
};
