const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const { ref, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');
exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
  });
  const usersResolve = await Promise.all(
    users.map(async (user) => {
      const imageRef = ref(storage, `${user.profileImgUrl}`);
      const url = await getDownloadURL(imageRef);
      user.profileImgUrl = url;
      return user;
    })
  );

  res.status(200).json({
    status: 'success',
    results: usersResolve,
    users,
  });
});

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const imageRef = ref(storage, `${user.profileImgUrl}`);
  const url = await getDownloadURL(imageRef);
  res.status(200).json({
    status: 'success',
    user: {
      name: user.name,
      email: user.email,
      description: user.description,
      profileImgUrl: url,
      role: user.role,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, description } = req.body;
  await user.update({
    name,
    description,
  });
  res.status(200).json({
    status: 'success',
    message: 'User updated successfully!🎉',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({
    status: 'disabled',
  });
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully!🎉',
  });
});
