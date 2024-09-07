const userController = require('../controllers/users.controller');
const express = require('express');

const router = express.Router();

const usersMiddleware = require('../middlewares/users.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware.protect);
// routes
router.route('/').get(userController.findAllUsers);

router.get(
  '/',
  authMiddleware.restrictTo('admin'),
  userController.findAllUsers
);

router
  .route('/:id')
  .get(usersMiddleware.validUser, userController.findOneUser)
  .patch(usersMiddleware.validUser, userController.updateUser)
  .delete(usersMiddleware.validUser, userController.deleteUser);

module.exports = router;
