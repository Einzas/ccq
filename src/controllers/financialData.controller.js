const FinancialData = require('../models/financialData.model');
const catchAsync = require('../utils/catchAsync');

exports.createFinancialData = catchAsync(async (req, res) => {
  const { preferredPaymentMethod, bankAccountNumber } = req.body;
  const financialData = await FinancialData.create({
    preferredPaymentMethod,
    bankAccountNumber,
  });
  res.status(201).json({
    status: 'success',
    data: {
      financialData,
    },
  });
});

exports.findAllFinancialData = catchAsync(async (req, res) => {
  const financialData = await FinancialData.findAll();
  res.status(200).json({
    status: 'success',
    results: financialData.length,
    data: {
      financialData,
    },
  });
});

exports.findOneFinancialData = catchAsync(async (req, res) => {
  const { financialData } = req;
  res.status(200).json({
    status: 'success',
    data: {
      financialData,
    },
  });
});

exports.updateFinancialData = catchAsync(async (req, res) => {
  const { financialData } = req;
  const { preferredPaymentMethod, bankAccountNumber } = req.body;
  await financialData.update({
    preferredPaymentMethod,
    bankAccountNumber,
  });
  res.status(200).json({
    status: 'success',
    message: 'Financial Data updated successfully!🎉',
    data: {
      financialData,
    },
  });
});

exports.deleteFinancialData = catchAsync(async (req, res) => {
  const { financialData } = req;
  await financialData.destroy();
  res.status(200).json({
    status: 'success',
    message: 'Financial Data deleted successfully!🎉',
  });
});

exports.getFinancialData = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const financialData = await FinancialData.findByPk(id);
  if (!financialData) {
    return res.status(404).json({
      status: 'fail',
      message: 'Financial Data not found!🚫',
    });
  }
  req.financialData = financialData;
  next();
});
