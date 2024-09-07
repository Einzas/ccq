const express = require('express');

const postController = require('../controllers/post.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const postMiddleware = require('../middlewares/post.middleware');
const validationsMiddleware = require('../middlewares/validations.middleware');
const commentMiddleware = require('../middlewares/comment.middleware');
const userMiddleware = require('../middlewares/users.middleware');
const { upload } = require('../utils/multer');
const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(
    upload.array('postImgs', 3),
    validationsMiddleware.createPostValidation,
    authMiddleware.protect,
    postController.createPost
  );
router.use(authMiddleware.protect);
router.get('/me', postController.getMyPosts);

router.get(
  '/profile/:id',
  userMiddleware.validUser,
  postController.getProfilePosts
);

router
  .route('/:id')
  .get(postMiddleware.validPostPerFindOne, postController.getPost)
  .patch(
    postMiddleware.validPost,
    validationsMiddleware.createPostValidation,
    authMiddleware.protectAccountOwner,
    postController.updatePost
  )
  .delete(
    postMiddleware.validPost,
    authMiddleware.protectAccountOwner,
    postController.deletePost
  );

module.exports = router;
