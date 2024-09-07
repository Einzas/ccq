const { body, validationResult } = require('express-validator');

const validField = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  next();
};

exports.createPostValidation = [
  body('title').notEmpty().withMessage('Title is required!'),
  body('content').notEmpty().withMessage('Content is required!'),
  validField,
];

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Must be a valid email!'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters long!'),
  body('description').notEmpty().withMessage('Description cannot be empty!'),
  validField,
];

exports.loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Must be a valid email!'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters long!'),
  validField,
];
exports.updateUserValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long!'),
  body('newPassword')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long!'),
  validField,
];

exports.createPostValidation = [
  body('title').notEmpty().withMessage('Title is required!'),
  body('content').notEmpty().withMessage('Content is required!'),
  validField,
];
