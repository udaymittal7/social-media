const express = require('express');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middlewares/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User with that email already exists',
      });
    }
    // Generate new password
    const salt = await brcypt.genSalt(10);
    const hashedPassword = await brcypt.hash(password, salt);

    // Create user
    user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Save user
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({
        message: 'User not found',
      });

    const isMatch = await brcypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Wrong password',
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get logged in user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      '-password -createdAt -updatedAt '
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// Get a user
router.get('/:user', auth, async (req, res) => {
  try {
    const user = await User.find({ username: req.params.user }).select(
      '-password -createdAt -updatedAt '
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router;
