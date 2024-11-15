const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

const Feedback = require('../models/feedback.model');

exports.validFeedback = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const feedback = await Feedback.findOne({
    where: {
      id: id,
    },
  });

  if (!feedback) {
    return next(new AppError('Feedback not found! 🧨', 404));
  }

  req.feedback = feedback;
  next();
});
