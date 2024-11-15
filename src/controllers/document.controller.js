const Document = require('../models/document.model');
const catchAsync = require('../utils/catchAsync');

exports.createDocument = catchAsync(async (req, res, next) => {
  const { documentType, documentUrl } = req.body;
  const document = await Document.create({
    documentType,
    documentUrl,
  });
  res.status(201).json({
    status: 'success',
    message: 'Document created successfully!🎉',
    document,
  });
});

exports.findAllDocuments = catchAsync(async (req, res, next) => {
  const documents = await Document.findAll();
  res.status(200).json({
    status: 'success',
    results: documents.length,
    documents,
  });
});

exports.findOneDocument = catchAsync(async (req, res, next) => {
  const { document } = req;
  res.status(200).json({
    status: 'success',
    document,
  });
});

exports.updateDocument = catchAsync(async (req, res, next) => {
  const { document } = req;
  const { documentType, documentUrl } = req.body;
  await document.update({
    documentType,
    documentUrl,
  });
  res.status(200).json({
    status: 'success',
    message: 'Document updated successfully!🎉',
    document,
  });
});

exports.deleteDocument = catchAsync(async (req, res, next) => {
  const { document } = req;
  await document.destroy();
  res.status(200).json({
    status: 'success',
    message: 'Document deleted successfully!🎉',
  });
});
