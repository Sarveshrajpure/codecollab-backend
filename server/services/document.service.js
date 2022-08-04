const { Document } = require("../models/document");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");

const checkDocumentName = async (fileName, fileExtension) => {
  try {
    let checkName = await Document.find({ fileName, fileExtension });

    if (checkName[0]) {
      return checkName[0].name;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const createDocument = async (
  fileName,
  fileContent,
  fileExtension,
  workspaceId
) => {
  try {
    const documentCreated = new Document({
      fileName,
      fileContent,
      fileExtension,
      workspaceId,
    });
    await documentCreated.save();
    return documentCreated;
  } catch (error) {
    throw error;
  }
};

const getAllDocuments = async (workspaceId) => {
  try {
    let getAllDocumentsByWorspaceId = await Document.find(
      { workspaceId },
      "fileName fileContent fileExtension createdAt"
    ).sort({
      updatedAt: -1,
    });

    return getAllDocumentsByWorspaceId;
  } catch (error) {
    throw error;
  }
};

const getOneDocument = async (documentId) => {
  try {
    let getOneDocumentsByDocumentId = await Document.find(
      { _id: documentId },
      "fileName fileContent fileExtension createdAt"
    );

    return getOneDocumentsByDocumentId;
  } catch (error) {
    throw error;
  }
};

const updateDocument = async (documentId, fileContent) => {
  try {
    const updateDocument = await Document.findOneAndUpdate(
      { _id: documentId },
      { fileContent }
    );

    return updateDocument;
  } catch (error) {
    throw error;
  }
};

const updateDocumentName = async (documentId, newName) => {
  try {
    const findAndUpdateDocumentName = await Document.findOneAndUpdate(
      { _id: documentId },
      { fileName: newName },
      { fields: { fileName: 1 } }
    );

    return findAndUpdateDocumentName;
  } catch (error) {
    throw error;
  }
};

const deleteDocument = async (documentId) => {
  try {
    let deleteDocmentById = await Document.deleteOne({ _id: documentId });

    return deleteDocmentById.deletedCount;
  } catch (error) {
    throw error;
  }
};

const deleteBlukDocument = async (workspaceId) => {
  try {
    let deleteManyDocuments = await Document.deleteMany({ workspaceId });

    return deleteManyDocuments.deletedCount;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  checkDocumentName,
  createDocument,
  getAllDocuments,
  getOneDocument,
  updateDocument,
  updateDocumentName,
  deleteDocument,
  deleteBlukDocument,
};
