const Feedback = require('../models/feedback.model');
const catchAsync = require('../utils/catchAsync');

exports.createFeedback = catchAsync(async (req, res) => {
  const { interestInCommissions, comments } = req.body;
  const feedback = await Feedback.create({
    interestInCommissions,
    comments,
  });
  res.status(201).json({
    status: 'success',
    feedback,
  });
});

exports.findAllFeedbacks = catchAsync(async (req, res) => {
  const feedbacks = await Feedback.findAll();
  res.status(200).json({
    status: 'success',
    results: feedbacks.length,
    feedbacks,
  });
});

exports.findOneFeedback = catchAsync(async (req, res) => {
  const { feedback } = req;
  res.status(200).json({
    status: 'success',
    feedback,
  });
});

exports.updateFeedback = catchAsync(async (req, res) => {
  const { feedback } = req;
  const { interestInCommissions, comments } = req.body;
  await feedback.update({
    interestInCommissions,
    comments,
  });
  res.status(200).json({
    status: 'success',
    feedback,
  });
});

exports.deleteFeedback = catchAsync(async (req, res) => {
  const { feedback } = req;
  await feedback.destroy();
  res.status(200).json({
    status: 'success',
    message: 'Feedback deleted successfully!🎉',
  });
});
