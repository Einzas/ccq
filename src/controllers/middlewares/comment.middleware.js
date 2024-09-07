const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.commentExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: User,
      },
    ],
  });
  if (!comment) {
    return next(new AppError('No comment found with that ID', 404));
  }

  req.comment = comment;
  req.user = comment.user;
  next();
});
