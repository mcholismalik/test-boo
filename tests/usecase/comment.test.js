'use strict';

// Unit Testing: Comment Usecase

const CommentUsecase = require('../../src/usecase/comment');
const { COMMENT_DATA_MOCK } = require('../../src/model/base');

// mock
const mockCommentData = COMMENT_DATA_MOCK;
const mockCommentRepository = {
	get: jest.fn().mockResolvedValue([mockCommentData]),
  create: jest.fn().mockResolvedValue(mockCommentData),
  like: jest.fn().mockResolvedValue(mockCommentData),
  unlike: jest.fn().mockResolvedValue(mockCommentData),
};

// Runner
describe('Comment Usecase', () => {	
  it('should create a new comment', async () => {
    const usecase = new CommentUsecase(mockCommentRepository);
    const commentCreated = await usecase.create(mockCommentData);
    
    expect(mockCommentRepository.create).toHaveBeenCalledWith(mockCommentData);
    expect(commentCreated).toEqual(mockCommentData);
  });

  it('should retrieve comments with filter and sort options', async () => {
    const usecase = new CommentUsecase(mockCommentRepository);
    const filterOptions = { postId: 'mock-post-id' };
    const sortOption = { createdAt: 'desc' };
    const page = 1;
    const limit = 10;
    
    
    const retrievedComments = await usecase.get(filterOptions, sortOption, page, limit);
    
    expect(mockCommentRepository.get).toHaveBeenCalledWith(filterOptions, sortOption, page, limit);
    expect(retrievedComments).toEqual([mockCommentData]);
  });

  it('should like a comment', async () => {
    const usecase = new CommentUsecase(mockCommentRepository);
    const commentId = 'mock-comment-id';
    const profileId = 'mock-profile-id';
    
    const likedComment = await usecase.like(commentId, profileId);
    
    expect(mockCommentRepository.like).toHaveBeenCalledWith(commentId, profileId);
    expect(likedComment).toEqual(mockCommentData);
  });

  it('should unlike a comment', async () => {
    const usecase = new CommentUsecase(mockCommentRepository);
    const commentId = 'mock-comment-id';
    const profileId = 'mock-profile-id';
    
    const unlikedComment = await usecase.unlike(commentId, profileId);
    
    expect(mockCommentRepository.unlike).toHaveBeenCalledWith(commentId, profileId);
    expect(unlikedComment).toEqual(mockCommentData);
  });
});
