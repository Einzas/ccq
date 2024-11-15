const FinancialData = require('../models/financialData.model');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.validFinancialData = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const financialData = await FinancialData.findOne({
    where: {
      id: id,
    },
  });

  if (!financialData) {
    return next(new AppError('Financial Data not found! 🧨', 404));
  }

  req.financialData = financialData;
  next();
});
