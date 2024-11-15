const LegalRepresentative = require('../models/legalRepresentative.model');
const catchAsync = require('../utils/catchAsync');

exports.createLegalRepresentative = catchAsync(async (req, res, next) => {
  const { fullName, identificationNumber, email, contactPhone } = req.body;
  const legalRepresentative = await LegalRepresentative.create({
    fullName,
    identificationNumber,
    email,
    contactPhone,
  });
  res.status(201).json({
    status: 'success',
    message: 'Legal Representative created successfully!🎉',
    legalRepresentative,
  });
});

exports.findAllLegalRepresentatives = catchAsync(async (req, res, next) => {
  const legalRepresentatives = await LegalRepresentative.findAll();
  res.status(200).json({
    status: 'success',
    results: legalRepresentatives.length,
    legalRepresentatives,
  });
});

exports.findOneLegalRepresentative = catchAsync(async (req, res, next) => {
  const { legalRepresentative } = req;
  res.status(200).json({
    status: 'success',
    legalRepresentative,
  });
});

exports.updateLegalRepresentative = catchAsync(async (req, res, next) => {
  const { legalRepresentative } = req;
  const { fullName, identificationNumber, email, contactPhone } = req.body;
  await legalRepresentative.update({
    fullName,
    identificationNumber,
    email,
    contactPhone,
  });
  res.status(200).json({
    status: 'success',
    message: 'Legal Representative updated successfully!🎉',
    legalRepresentative,
  });
});

exports.deleteLegalRepresentative = catchAsync(async (req, res, next) => {
  const { legalRepresentative } = req;
  await legalRepresentative.destroy();
  res.status(200).json({
    status: 'success',
    message: 'Legal Representative deleted successfully!🎉',
  });
});
