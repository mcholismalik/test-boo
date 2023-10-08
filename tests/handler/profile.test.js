'use strict';

// Integration Testing: Profile Handler

const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');

const ProfileHandler = require('../../src/handler/profile');
const { PROFILE_DATA_MOCK } = require('../../src/model/base');
const WinstonLogger = require('../../src/driver/winstonLogger');
const ProfileRepository = require('../../src/repository/profile');
const ProfileUsecase = require('../../src/usecase/profile');
const MongoDb = require('../../src/driver/mongoDb');

// dependecies
const app = express();
const logger = new WinstonLogger();
const db = new MongoDb();

const expect = chai.expect;
chai.use(chaiHttp);

const profileRepository = new ProfileRepository();
const profileUsecase = new ProfileUsecase(profileRepository);
const profileHandler = new ProfileHandler(logger, profileUsecase);
app.set('view engine', 'ejs');
app.use(profileHandler.router);

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
  it('should retrieve a profile by ID', async () => {
    const profileCreated = await profileRepository.create(mockProfileData);
    const response = await chai
      .request(app)
      .get(`/profile/${profileCreated._id}`);

    expect(response).to.have.status(200);
    expect(response).to.have.header('content-type', 'text/html; charset=utf-8');
    expect(response.text).to.include(mockProfileData.name);
  });
});
