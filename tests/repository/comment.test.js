'use strict';

// Functional Testing: Comment Repository

const MongoDb = require('../../src/driver/mongoDb');
const CommentRepository = require('../../src/repository/comment');
const ProfileRepository = require('../../src/repository/profile');
const { PROFILE_DATA_MOCK, PROFILE_DATA_MOCK2, COMMENT_DATA_MOCK, COMMENT_SORT_BY_BEST } = require('../../src/model/base');

// dependencies
const db = new MongoDb();

// mock
const mockProfileData = PROFILE_DATA_MOCK;
const mockProfileData2 = PROFILE_DATA_MOCK2;
const mockCommentData = COMMENT_DATA_MOCK;
let createdProfileData, createdProfileData2;

// runner
beforeAll(async () => {
  await db.init();

	const profileRepository = new ProfileRepository();
	createdProfileData = await profileRepository.create(mockProfileData);
	createdProfileData2 = await profileRepository.create(mockProfileData2);
});

afterAll(async () => {
  await db.close();
});

describe('Comment Repository', () => {
  it('should create a new comment', async () => {    
    const commentRepository = new CommentRepository();
		mockCommentData.profileId = createdProfileData._id;
    const createdComment = await commentRepository.create(mockCommentData);

    expect(createdComment._id).toBeDefined();

    const { _id, __v, createdAt, ...createdCommentObject } = createdComment;
    expect(createdCommentObject).toEqual(mockCommentData);
  });

  it('should retrieve comments with filtering and sorting', async () => {
    const repository = new CommentRepository();

    const filterOptions = {
      mbti: 'INTJ',
    };
    const sortOption = COMMENT_SORT_BY_BEST;
    const comments = await repository.get(filterOptions, sortOption);

    expect(comments).toBeDefined();
  });

  it('should like a comment', async () => {
    const repository = new CommentRepository();
		mockCommentData.profileId = createdProfileData._id;
    const createdComment = await repository.create(mockCommentData);
    const commentId = createdComment._id;

    const profileId = createdProfileData2._id;
    const updatedComment = await repository.like(commentId, profileId);

    expect(updatedComment).toBeDefined();
    expect(updatedComment.likes).toContainEqual(profileId);
  });

  it('should unlike a comment', async () => {
    const repository = new CommentRepository();
		mockCommentData.profileId = createdProfileData._id;
    const createdComment = await repository.create(mockCommentData);
    const commentId = createdComment._id;

    const profileId = createdProfileData2._id;
    await repository.like(commentId, profileId);

    const updatedComment = await repository.unlike(commentId, profileId);

    expect(updatedComment).toBeDefined();
    expect(updatedComment.likes).not.toContainEqual(profileId);
  });
});
