'use strict';

const mongoose = require('mongoose');

const ProfileEntity = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  mbti: String,
  enneagram: String,
  variant: String,
  tritype: Number,
  socionics: String,
  sloan: String,
  psyche: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  ProfileEntity,
};
