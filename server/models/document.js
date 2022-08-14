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
    fileContent: {
      type: String,
    },
    fileExtension: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workspace",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = { Document };
