const { body, validationResult } = require('express-validator');

const validField = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  next();
};

exports.createUserValidation = [
  body('fullName').notEmpty().withMessage('Full name is required!'),
  body('identificationNumber')
    .notEmpty()
    .withMessage('Identification number is required!'),
  body('birthDate').notEmpty().withMessage('Birth date is required!'),
  body('address').notEmpty().withMessage('Address is required!'),
  body('personalEmail').notEmpty().withMessage('Personal email is required!'),
  body('mobilePhone').notEmpty().withMessage('Mobile phone is required!'),
  body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long!'),

  validField,
];

exports.updateUserValidation = [
  body('fullName').notEmpty().withMessage('Full name is required!'),
  body('address').notEmpty().withMessage('Address is required!'),
  body('personalEmail').notEmpty().withMessage('Personal email is required!'),
  body('mobilePhone').notEmpty().withMessage('Mobile phone is required!'),
  validField,
];

exports.loginValidation = [
  body('personalEmail')
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
