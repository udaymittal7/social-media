const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const User = require('../models/User');
const { route } = require('./userRoutes');
const auth = require('../middlewares/auth');

const router = express.Router();

// Multer upload
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/post');
  },
  filename: (req, file, cb) => {
    const name = `post-${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const upload = multer({ storage: multerStorage });

// Create a post
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      user: req.user.id,
      desc: req.body.desc,
      image: req.file.path.replace(/\\/g, '/').substr(14),
      name: user.username,
      avatar: user.profilePicture,
    });
    const post = await newPost.save();
    console.log(post.image);
    res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Get timeline posts
router.get('/timeline', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const userPosts = await Post.find({ user: req.user.id });
    const friendsPosts = await Promise.all(
      currentUser.followings.map(async (item) => {
        return await Post.find({ user: item.user });
      })
    );
    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err,
    });
  }
});

// Get profile Posts
router.get('/profile/:user', auth, async (req, res) => {
  try {
    const user = await User.find({ username: req.params.user });
    const userPosts = await Post.find({ user: user });

    res.status(200).json(userPosts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err,
    });
  }
});

// Get a post
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }

    return res.status(200).json({
      post,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Update a post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }

    if (post.user.toString() === req.user.id) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json({
        message: 'Your post has been updated',
        post,
      });
    } else {
      return res.status(401).json({
        message: 'You can update only your post',
      });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }

    if (post.user.toString() === req.user.id) {
      await post.remove();
      res.status(200).json({
        message: 'Your post has been deleted',
      });
    } else {
      return res.status(401).json({
        message: 'You can delete only your post',
      });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Like and Dislike a post
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }

    if (
      !post.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      post.likes.unshift({ user: req.user.id });
    } else {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);
    }

    await post.save();

    return res.status(200).json(post.likes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Comment on a post
router.put('/comment/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    console.log(req.body);
    const newComment = {
      text: req.body.text,
      name: user.username,
      picture: user.profilePicture,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.status(200).json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Delete Comment
router.delete('/comment/:id/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );

    if (!comment) {
      return res
        .status(404)
        .json({ message: 'Comment with that ID doest not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'You can delete only your comments' });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.status(200).json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

module.exports = router;
