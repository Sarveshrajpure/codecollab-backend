const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const workspaceController = {
  async create() {
    console.log("in workspace create");
  },
};

module.exports = workspaceController;
