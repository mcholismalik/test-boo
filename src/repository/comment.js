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

  async get(filterOptions, sortOption, page = 1, limit = 10) {
    const CommentModel = mongoose.model('Comment', CommentEntity);
  
    // filter
    const query = {};
    if (filterOptions.profileId) {
      query.profileId = new mongoose.Types.ObjectId(filterOptions.profileId);
    }
  
    const filterFields = ['mbti', 'enneagram', 'zodiac'];
    query.$and = filterFields
      .filter(field => filterOptions[field] === "true")
      .map(field => ({ [field]: { $ne: null, $ne: '' } }));
  
    if (query.$and.length === 0) {
      delete query.$and;
    }
  
    // sort
    const sort = sortOption === COMMENT_SORT_BY_BEST ? { likes: -1, createdAt: -1 } : { createdAt: -1 };
  
    const skip = (page - 1) * limit;
  
    const comments = await CommentModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
  
    return comments;
  }
}

module.exports = CommentRepository;
