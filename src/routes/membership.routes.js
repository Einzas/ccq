const membershipController = require('../controllers/membership.controller');
const express = require('express');

const router = express.Router();

const membershipMiddleware = require('../middlewares/membership.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware.protect);

// routes
router.route('/').get(membershipController.findAllMemberships);

router.route('/').post(membershipController.createMembership);

router
  .route('/:id')
  .get(
    membershipMiddleware.validMembership,
    membershipController.findOneMembership
  )
  .patch(
    membershipMiddleware.validMembership,
    membershipController.updateMembership
  )
  .delete(
    membershipMiddleware.validMembership,
    membershipController.deleteMembership
  );

module.exports = router;
