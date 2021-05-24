const express = require('express');
const User = require('../models/User');
const brcypt = require('bcryptjs');
const auth = require('../middlewares/auth');

const router = express.Router();

// Update user
router.put('/:id', auth, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    const userFields = {};

    if (req.body.password) {
      try {
        const salt = await brcypt.genSalt(10);
        req.body.password = await brcypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(err);
      }
    }

    const {
      password,
      bio,
      gender,
      mobile,
      address,
      website,
      relationship,
      facebook,
      instagram,
      twitter,
      school,
      college,
      title,
      company,
    } = req.body;

    if (password) userFields.password = password;
    if (bio) userFields.bio = bio;
    if (gender) userFields.gender = gender;
    if (relationship) userFields.relationship = relationship;
    if (mobile) userFields.mobile = mobile;
    if (address) userFields.address = address;
    if (website) userFields.website = website;

    userFields.social = {};
    if (facebook) userFields.social.facebook = facebook;
    if (instagram) userFields.social.instagram = instagram;
    if (twitter) userFields.social.facebook = facebook;

    const newWork = {
      title,
      company,
    };

    const newEducation = {
      school,
      college,
    };

    userFields.work = [];
    userFields.education = [];

    userFields.work.unshift(newWork);
    userFields.education.unshift(newEducation);

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: userFields,
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'You can update only your account',
    });
  }
});

// Delete user
router.delete('/:id', auth, async (req, res) => {
  if (req.user.id === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Account has been deleted',
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'You can delete only your account',
    });
  }
});

// Get a user
router.get('/:username', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });

    if (!user) {
      return res.status(404).json({
        message: 'No user with that ID',
      });
    } else {
      const { password, updatedAt, __v, ...others } = user;
      return res.status(200).json({
        status: 'success',
        user: others,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: '',
    });
  }
});

// Get Friends
router.get('/:username/friends', auth, async (req, res) => {
  try {
    const user = await User.find({ username: req.params.username });
    const friends = await Promise.all(
      user[0].followings.map(async (friendId) => {
        console.log(friendId);
        return await User.findById(friendId.user);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendList);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
});

// Follow or Unfollow a user
router.put('/follow/:id', auth, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID',
        });
      }

      const currentUser = await User.findById(req.user.id);

      if (
        !user.followers.filter(
          (follower) => follower.user.toString() === req.user.id
        ).length > 0
      ) {
        user.followers.unshift({ user: req.user.id });
        currentUser.followings.unshift({ user: req.params.id });
      } else {
        const removeIndexUser = user.followers
          .map((follower) => follower.user.toString())
          .indexOf(req.user.id);

        user.followers.splice(removeIndexUser, 1);

        const removeIndexCurrentUser = currentUser.followings
          .map((following) => following.user.toString())
          .indexOf(req.params.id);

        currentUser.followings.splice(removeIndexCurrentUser, 1);
      }

      await user.save();
      await currentUser.save();

      return res.status(200).json(currentUser.followings);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Server Error',
      });
    }
  } else {
    req.status(403).json({
      status: 'fail',
      message: 'You can not follow yourself',
    });
  }
});

module.exports = router;
