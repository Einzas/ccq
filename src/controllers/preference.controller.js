const Preferences = require('../models/preferences.model');
const catchAsync = require('../utils/catchAsync');

exports.createPreference = catchAsync(async (req, res, next) => {
  const { communicationPreference, eventInterests, collaborationAreas } =
    req.body;
  const preference = await Preferences.create({
    communicationPreference,
    eventInterests,
    collaborationAreas,
  });
  res.status(201).json({
    status: 'success',
    message: 'Preference created successfully!🎉',
    preference,
  });
});

exports.findAllPreferences = catchAsync(async (req, res, next) => {
  const preferences = await Preferences.findAll();
  res.status(200).json({
    status: 'success',
    results: preferences.length,
    preferences,
  });
});

exports.findOnePreference = catchAsync(async (req, res, next) => {
  const { preference } = req;
  res.status(200).json({
    status: 'success',
    preference,
  });
});

exports.updatePreference = catchAsync(async (req, res, next) => {
  const { preference } = req;
  const { communicationPreference, eventInterests, collaborationAreas } =
    req.body;
  await preference.update({
    communicationPreference,
    eventInterests,
    collaborationAreas,
  });
  res.status(200).json({
    status: 'success',
    message: 'Preference updated successfully!🎉',
    preference,
  });
});

exports.deletePreference = catchAsync(async (req, res, next) => {
  const { preference } = req;
  await preference.destroy();
  res.status(200).json({
    status: 'success',
    message: 'Preference deleted successfully!🎉',
  });
});
