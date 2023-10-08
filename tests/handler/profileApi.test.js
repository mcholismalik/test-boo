'use strict';

// Integration Testing: Profile API Handler

const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');

const ProfileApiHandler = require('../../src/handler/profileApi');
const { PROFILE_DATA_MOCK } = require('../../src/model/base');
const WinstonLogger = require('../../src/driver/winstonLogger');
const ProfileRepository = require('../../src/repository/profile');
const ProfileUsecase = require('../../src/usecase/profile');
const MongoDb = require('../../src/driver/mongoDb');

// dependecies
const app = express();
const logger = new WinstonLogger();
const db = new MongoDb();

const profileRepository = new ProfileRepository();
const profileUsecase = new ProfileUsecase(profileRepository);
const profileApiHandler = new ProfileApiHandler(logger, profileUsecase);
app.use(bodyParser.json())
app.use(profileApiHandler.router);

// mock
const mockProfileData = PROFILE_DATA_MOCK;

// runner
beforeAll(async () => {
  await db.init();
});

afterAll(async () => {
  await db.close();
});

describe('Profile API Handler', () => {
  it('should create a new profile', async () => {
    const response = await request(app)
      .post('/api/profile')
      .send(mockProfileData)
      .expect(201);

    const {_id, __v, createdAt, ...dataObject } = response.body.data;
    expect(dataObject).toEqual(mockProfileData);
  });
});
