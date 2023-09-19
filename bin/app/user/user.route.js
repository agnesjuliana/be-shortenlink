// userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
const { validate } = require('../../services/validation.service')
const validator = require('./user.validate');
const auth = require('../../services/jwt.service');

router.post('/register',validator.registerValidation(), validate,UserController.register);
router.post('/login',validator.loginValidation(), validate,UserController.login);
router.get('/', auth.authenticateJwtToken,UserController.getUsers);
router.put('/:id', auth.authenticateJwtToken, UserController.updateUser);

// router.delete('/duplicate/:secret', auth.authenticateJwtToken, UserController.deleteDuplicateUSer);
// router.get('/:id', UserController.getUserById);
// router.post('/', validateUser, UserController.createUser);
// router.put('/:id', validateUser, UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

module.exports = router;
