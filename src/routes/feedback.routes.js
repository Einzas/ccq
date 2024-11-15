const feedbackController = require('../controllers/feedback.controller');
const express = require('express');

const router = express.Router();

const feedbackMiddleware = require('../middlewares/feedback.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware.protect);

// routes
router.route('/').get(feedbackController.findAllFeedbacks);

router.route('/').post(feedbackController.createFeedback);

router
  .route('/:id')
  .get(feedbackMiddleware.validFeedback, feedbackController.findOneFeedback)
  .patch(feedbackMiddleware.validFeedback, feedbackController.updateFeedback)
  .delete(feedbackMiddleware.validFeedback, feedbackController.deleteFeedback);

module.exports = router;
