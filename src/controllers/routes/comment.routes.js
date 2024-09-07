const commentController = require('../controllers/comment.controller');
const commentMiddleware = require('../middlewares/comment.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const express = require('express');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/', commentController.findAllComments);

router.post('/:postId', commentController.createComment);

router
  .use('/:id', commentMiddleware.commentExist)
  .route('/:id')
  .get(commentController.findComment)
  .patch(authMiddleware.protectAccountOwner, commentController.updateComment)
  .delete(authMiddleware.protectAccountOwner, commentController.deleteComment);

module.exports = router;
