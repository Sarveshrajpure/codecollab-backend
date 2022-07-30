const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const documentController = {
  async create() {
    console.log("in document create");
  },
};

module.exports = documentController;
