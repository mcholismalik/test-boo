'use strict';

// Integration Testing: Comment API Handler

const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const CommentApiHandler = require('../../src/handler/commentApi');
const { COMMENT_DATA_MOCK, PROFILE_DATA_MOCK, PROFILE_DATA_MOCK_2, COMMENT_SORT_BY_BEST } = require('../../src/model/base');
const WinstonLogger = require('../../src/driver/winstonLogger');
const CommentRepository = require('../../src/repository/comment');
const CommentUsecase = require('../../src/usecase/comment');
const MongoDb = require('../../src/driver/mongoDb');
const ProfileRepository = require('../../src/repository/profile');

// dependencies
const app = express();
const logger = new WinstonLogger();
const db = new MongoDb();

const commentRepository = new CommentRepository();
const commentUsecase = new CommentUsecase(commentRepository);
const commentApiHandler = new CommentApiHandler(logger, commentUsecase);
app.use(bodyParser.json());
app.use(commentApiHandler.router);

// mock
const mockProfileData = PROFILE_DATA_MOCK;
const mockProfileData2 = PROFILE_DATA_MOCK_2;
const mockCommentData = COMMENT_DATA_MOCK;
let createdProfileData, createdProfileData2;
let createdCommendData;

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

describe('Comment API Handler', () => {
	it('should create a new comment', async () => {
		mockCommentData.profileId = createdProfileData._id;
    const response = await request(app)
      .post('/api/comment')
      .send(mockCommentData)
      .expect(201);
		
		createdCommendData = response.body.data;
    const { _id, __v, createdAt, ...dataObject } = createdCommendData;
    expect(dataObject.profileId).toEqual(mockCommentData.profileId.toString());
  });

	it('should retrieve comments with filter and sort options', async () => {
    const filterOptions = { mbti: 'ENTJ', };
    const sortOption = COMMENT_SORT_BY_BEST;

    const response = await request(app)
      .get(`/api/comment?mbti=${filterOptions.mbti}&sort=${sortOption}`)
      .expect(200);

		expect(response.body.data.length).toEqual(1);
  });

  it('should like a comment', async () => {
    const data = { commentId: createdCommendData._id, profileId: createdProfileData2._id };

    const response = await request(app)
      .patch('/api/comment/like')
      .send(data)
      .expect(200);
		
		const { likes } = response.body.data;
		expect(likes.length).toEqual(1);
  });

  it('should unlike a comment', async () => {
    const data = { commentId: createdCommendData._id, profileId: createdProfileData2._id };

    const response = await request(app)
      .patch('/api/comment/unlike')
      .send(data)
      .expect(200);

		const { likes } = response.body.data;
		expect(likes.length).toEqual(0);
  });
});
