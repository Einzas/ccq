const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const generateJWT = require('./../utils/jwt');
const AppError = require('../utils/appError');

const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

exports.signup = catchAsync(async (req, res, next) => {
  const imgRef = ref(storage, `users/${Date.now()}-${req.file.originalname}`);
  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
  const { name, email, password, description } = req.body;
  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    description,
    profileImgUrl: imgUploaded.metadata.fullPath,
  });
  const token = await generateJWT(user.id);
  const imgRefDown = ref(storage, user.profileImgUrl);
  const imgDownloadUrl = await getDownloadURL(imgRefDown);

  user.profileImgUrl = imgDownloadUrl;
  res.status(200).json({
    status: 'success',
    message: 'User created successfully!🎉',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
      profileImgUrl: user.profileImgUrl,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('User with that email not found!', 404));
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email/password!', 401));
  }

  const token = await generateJWT(user.id);

  const imgRef = ref(storage, user.profileImgUrl);
  const imgDownloadUrl = await getDownloadURL(imgRef);

  user.profileImgUrl = imgDownloadUrl;

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
      profileImgUrl: user.profileImgUrl,
      role: user.role,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Current password is incorrect!', 401));
  }

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encryptedPassword,
    passwordChangedAt: new Date(),
  });

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully!🎉',
  });
});

exports.renew = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;
  const user = await User.findOne({
    where: {
      id: id,
      status: 'active',
    },
  });
  if (!user) {
    return next(new AppError('User not found! 🧨', 404));
  }
  const token = await generateJWT(id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
      profileImgUrl: user.profileImgUrl,
      role: user.role,
    },
  });
});
