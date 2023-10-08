'use strict';

const mongoose = require('mongoose');
const { CommentEntity } = require('../model/commentEntity');
const { COMMENT_SORT_BY_BEST } = require('../model/base');

class CommentRepository {
  constructor() {}

  async create(comment) {
    const CommentModel = mongoose.model('Comment', CommentEntity);
    const createdComment = await CommentModel.create(comment);
    return createdComment.toObject();
  }

  async like(commentId, profileId) {
    const CommentModel = mongoose.model('Comment', CommentEntity);
    const objectId = new mongoose.Types.ObjectId(commentId);
    const updatedComment = await CommentModel.findByIdAndUpdate(
      objectId,
      { $addToSet: { likes: profileId } },
      { new: true }
    );
    return updatedComment ? updatedComment.toObject() : null;
  }

  async unlike(commentId, profileId) {
    const CommentModel = mongoose.model('Comment', CommentEntity);
    const objectId = new mongoose.Types.ObjectId(commentId);
    const updatedComment = await CommentModel.findByIdAndUpdate(
      objectId,
      { $pull: { likes: profileId } },
      { new: true }
    );
    return updatedComment ? updatedComment.toObject() : null;
  }

  async get(filterOptions, sortOption) {
    const CommentModel = mongoose.model('Comment', CommentEntity);
  
		// filter
    const query = {};  
    if (filterOptions.mbti) {
      query.mbti = { $ne: null, $exists: true };
    }
    if (filterOptions.enneagram) {
      query.enneagram = { $ne: null, $exists: true };
    }
    if (filterOptions.zodiac) {
      query.zodiac = { $ne: null, $exists: true };
    }
    
		// sort
    const sort = sortOption === COMMENT_SORT_BY_BEST ? { likes: -1, createdAt: -1 } : { createdAt: -1 };
  
    const comments = await CommentModel.find(query).sort(sort).lean();
    return comments;
  }
}

module.exports = CommentRepository;
