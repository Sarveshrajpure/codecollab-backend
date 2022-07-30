const mongoose = require("mongoose");
require("dotenv").config();

const documentSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      maxLength: 100,
      required: true,
      trim: true,
    },
    content: {
      type: String,
    },
    fileExtension: {
      type: "string",
      maxLength: "50",
      trim: true,
    },
    workSpaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workspace",
      required: true,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = { Document };
