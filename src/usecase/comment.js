'use strict';

class CommentUsecase {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async create(comment) {
    return await this.commentRepository.create(comment);
  }

  async like(commentId, profileId) {
    return await this.commentRepository.like(commentId, profileId);
  }

  async unlike(commentId, profileId) {
    return await this.commentRepository.unlike(commentId, profileId);
  }

  async get(filterOptions, sortOption, page, limit) {
    return await this.commentRepository.get(filterOptions, sortOption, page, limit);
  }  
}

module.exports = CommentUsecase;
