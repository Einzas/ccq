const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/comment.model');

exports.findAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.findAll({
    where: {
      status: true,
    },
  });
  res.status(200).json({
    status: 'success',
    results: comments.length,
    comments,
  });
});
exports.createComment = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const { postId } = req.params;
  const { sessionUser } = req;
  const comment = await Comment.create({
    text,
    postId,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Comment created successfully 😁',
    comment,
  });
});
exports.findComment = catchAsync(async (req, res, next) => {
  const { comment } = req;
  res.status(200).json({
    status: 'success',
    comment,
  });
});
exports.updateComment = catchAsync(async (req, res, next) => {
  const { comment } = req;
  const { text } = req.body;
  const commentUpdated = await comment.update({
    text,
  });
  res.status(200).json({
    status: 'success',
    message: 'Comment updated successfully! 🎉',
    commentUpdated,
  });
});
exports.deleteComment = catchAsync(async (req, res, next) => {
  const { comment } = req;
  await comment.update({
    status: false,
  });
  res.status(200).json({
    status: 'success',
    message: 'Comment deleted successfully! 🎉',
  });
});
