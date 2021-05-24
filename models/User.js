const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, 'Please enter your username'],
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      require: [true, 'Please enter your name'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Please enter your password'],
      min: 8,
    },
    profilePicture: {
      type: String,
      default: 'person/noAvatar.png',
    },
    coverPicture: {
      type: String,
      default: 'person/noCover.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      max: 50,
    },
    gender: {
      type: String,
      default: 'Male',
      enum: ['Male', 'Female', 'Other'],
    },
    mobile: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    followers: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    followings: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    relationship: {
      type: String,
      enum: ['Single', 'Relationship', 'Complicated', 'Married'],
    },
    education: [
      {
        school: {
          type: String,
          require: true,
        },
        college: {
          type: String,
        },
      },
    ],
    work: [
      {
        title: {
          type: String,
          require: true,
        },
        company: {
          type: String,
          require: true,
        },
      },
    ],
    social: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
