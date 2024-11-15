const Preferences = require('../models/preferences.model');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.validPreference = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const preference = await Preferences.findOne({
    where: {
      id: id,
    },
  });
  if (!preference) {
    return next(new AppError('Preference not found! 🧨', 404));
  }
  req.preference = preference;
  next();
});
