const Document = require('../models/document.model');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.validDocument = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const document = await Document.findOne({
    where: {
      id: id,
    },
  });

  if (!document) {
    return next(new AppError('Document not found! 🧨', 404));
  }

  req.document = document;
  next();
});
