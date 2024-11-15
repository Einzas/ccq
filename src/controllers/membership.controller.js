const Membership = require('../models/membership.model');
const catchAsync = require('../utils/catchAsync');

exports.createMembership = catchAsync(async (req, res, next) => {
  const { category } = req.body;
  const membership = await Membership.create({
    category,
  });
  res.status(201).json({
    status: 'success',
    message: 'Membership created successfully!🎉',
    membership,
  });
});

exports.findAllMemberships = catchAsync(async (req, res, next) => {
  const memberships = await Membership.findAll();
  res.status(200).json({
    status: 'success',
    results: memberships.length,
    memberships,
  });
});

exports.findOneMembership = catchAsync(async (req, res, next) => {
  const { membership } = req;
  res.status(200).json({
    status: 'success',
    membership,
  });
});

exports.updateMembership = catchAsync(async (req, res, next) => {
  const { membership } = req;
  const { category } = req.body;
  await membership.update({
    category,
  });
  res.status(200).json({
    status: 'success',
    message: 'Membership updated successfully!🎉',
    membership,
  });
});

exports.deleteMembership = catchAsync(async (req, res, next) => {
  const { membership } = req;
  await membership.destroy();
  res.status(200).json({
    status: 'success',
    message: 'Membership deleted successfully!🎉',
  });
});
