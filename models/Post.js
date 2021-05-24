const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
        text: {
          type: String,
          require: true,
        },
        name: {
          type: String,
        },
        picture: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
