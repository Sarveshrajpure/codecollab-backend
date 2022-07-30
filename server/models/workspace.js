const mongoose = require("mongoose");
require("dotenv").config();

const workspaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 100,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = { Workspace };
