'use strict';

const mongoose = require('mongoose');

const CommentEntity = new mongoose.Schema({
  id: Number,
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  mbti: {
    type: String,
    default: null,
  },
  enneagram: {
    type: String,
    default: null,
  },
  zodiac: {
    type: String,
    default: null,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // For now, we pass this as part of the request body. When we implement authentication soon, we will intercept it based on the token body.
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
});

module.exports = {
  CommentEntity,
};
