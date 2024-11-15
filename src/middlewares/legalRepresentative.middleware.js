const LegalRepresentative = require('../models/legalRepresentative.model');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.validLegalRepresentative = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const legalRepresentative = await LegalRepresentative.findOne({
    where: {
      id: id,
    },
  });

  if (!legalRepresentative) {
    return next(new AppError('Legal Representative not found! 🧨', 404));
  }

  req.legalRepresentative = legalRepresentative;
  next();
});
