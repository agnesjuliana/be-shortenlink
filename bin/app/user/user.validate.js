// userValidator.js

const { body } = require('express-validator');

function registerValidation() {
  return [
    body('full_name').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('repeat_password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn([
      'user_nbcc', 'user_mo', 'user_msc', 'user_uastec',
      'admin_nbcc', 'admin_mo', 'admin_msc', 'admin_uastec',
      'superadmin'
    ]).withMessage('Invalid role'),
    body('level').isInt().withMessage('Level must be an integer'),
  ];
}

function loginValidation() {
  return [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ];
}

module.exports = {
  registerValidation,
  loginValidation
};
