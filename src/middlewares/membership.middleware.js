const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

const Membership = require('../models/membership.model');

exports.validMembership = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const membership = await Membership.findOne({
    where: {
      id: id,
    },
  });

  if (!membership) {
    return next(new AppError('Membership not found! 🧨', 404));
  }

  req.membership = membership;
  next();
});
