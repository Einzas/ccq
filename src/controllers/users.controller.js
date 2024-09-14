const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      fullName: user.fullName,
      identificationNumber: user.identificationNumber,
      birthDate: user.birthDate,
      gender: user.gender,
      address: user.address,
      personalEmail: user.personalEmail,
      mobilePhone: user.mobilePhone,
      role: user.role,
      status: user.status,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { fullName, gender, address, personalEmail, mobilePhone } = req.body;
  await user.update({
    fullName: fullName,
    gender: gender,
    address: address,
    personalEmail: personalEmail,
    mobilePhone: mobilePhone,
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
    status: 'inactive',
  });
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully!🎉',
  });
});

exports.deleteUserPermanently = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.destroy();
  res.status(200).json({
    status: 'success',
    message: 'User deleted permanently!🎉',
  });
});

exports.banUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({
    status: 'banned',
  });
  res.status(200).json({
    status: 'success',
    message: 'User banned successfully!🎉',
  });
});
