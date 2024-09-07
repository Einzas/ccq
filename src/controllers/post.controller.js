const Post = require('../models/post.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/user.model');
const { db } = require('../database/config');
const PostImg = require('../models/postImg.model');
const { storage } = require('../utils/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

exports.createPost = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.sessionUser;

  const post = await Post.create({
    title,
    content,
    userId: id,
  });
  const postImgsPromise = req.files.map(async (file) => {
    const imgRef = ref(storage, `postsImg/${Date.now()}_${file.originalname}`);
    const imgUploaded = await uploadBytes(imgRef, file.buffer);
    const postImg = await PostImg.create({
      postId: post.id,
      postImgUrl: imgUploaded.metadata.fullPath,
    });
  });

  await Promise.all(postImgsPromise);

  return res.status(201).json({
    status: 'success',
    message: 'Post created successfully!🎉',
    post,
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({
    where: {
      status: 'active',
    },
    attributes: {
      exclude: ['userId', 'status'],
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'profileImgUrl', 'description'],
      },
      {
        model: PostImg,
      },
    ],
    order: [['createdAt', 'DESC']],
    limit: 10,
  });

  const postsPromise = posts.map(async (post) => {
    const postImgPromise = post.postImgs.map(async (postImg) => {
      const imgRef = ref(storage, postImg.postImgUrl);
      const imgDownloadUrl = await getDownloadURL(imgRef);
      postImg.postImgUrl = imgDownloadUrl;
      return postImg;
    });
    const imgRefUser = ref(storage, post.user.profileImgUrl);
    const imgDownloadUrlUser = await getDownloadURL(imgRefUser);
    post.user.profileImgUrl = imgDownloadUrlUser;
    await Promise.all(postImgPromise);
    return post;
  });

  await Promise.all(postsPromise);
  return res.status(200).json({
    status: 'success',
    results: posts.length,
    posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const { post } = req;
  const imgRefUserProfile = ref(storage, post.user.profileImgUrl);
  const urlProfileUser = await getDownloadURL(imgRefUserProfile);

  post.user.profileImgUrl = urlProfileUser;

  const postImgPromise = post.postImgs.map(async (postImg) => {
    const imgRef = ref(storage, postImg.postImgUrl);
    const imgDownloadUrl = await getDownloadURL(imgRef);
    postImg.postImgUrl = imgDownloadUrl;
    return postImg;
  });

  const userImgCommentPromise = post.comments.map(async (comment) => {
    const imgRef = ref(storage, comment.user.profileImgUrl);
    const imgDownloadUrl = await getDownloadURL(imgRef);
    comment.user.profileImgUrl = imgDownloadUrl;
    return comment;
  });
  const array = [...postImgPromise, ...userImgCommentPromise];
  await Promise.all(array);
  return res.status(200).json({
    status: 'success',
    post,
  });
});

exports.getMyPosts = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const query =
    'SELECT * FROM posts WHERE "userId" = :iduser AND status = :status';
  const [rows, fields] = await db.query(query, {
    replacements: {
      iduser: sessionUser.id,
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: fields.rowCount,
    posts: rows,
  });
});

exports.getProfilePosts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const posts = await Post.findAll({
    where: {
      userId: id,
      status: 'active',
    },
    attributes: {
      exclude: ['userId', 'status'],
    },
    include: [
      {
        model: User,
        attributes: { exclude: ['password', 'passwordChangedAt'] },
      },
      {
        model: PostImg,
      },
    ],
    order: [['createdAt', 'DESC']],
    limit: 10,
  });
  return res.status(200).json({
    status: 'success',
    results: posts.length,
    posts,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const { post } = req;
  const { title, content } = req.body;
  const postUpdated = await post.update({
    title,
    content,
  });
  return res.status(200).json({
    status: 'success',
    post: postUpdated,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const { post } = req;
  await post.update({
    status: 'disabled',
  });
  return res.status(200).json({
    status: 'success',
  });
});
