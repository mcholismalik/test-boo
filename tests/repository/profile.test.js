'use strict';

// Functional Testing: Profile Repository

const MongoDb = require('../../src/driver/mongoDb');
const { PROFILE_DATA_MOCK } = require('../../src/model/base');
const ProfileRepository = require('../../src/repository/profile');

// dependencies
const db = new MongoDb();

// mock
const mockProfileData = PROFILE_DATA_MOCK;

// runner
beforeAll(async () => {
  await db.init();
});

afterAll(async () => {
  await db.close();
});

describe('Profile Repository', () => {
  it('should create a new profile', async () => {
    const repository = new ProfileRepository();
    const createdProfile = await repository.create(mockProfileData);
    
    expect(createdProfile._id).toBeDefined();
		
		const { _id, __v, createdAt, ...createdProfileObject } = createdProfile;
		expect(createdProfileObject).toEqual(mockProfileData);
  });

  it('should retrieve a profile by ID', async () => {
    const repository = new ProfileRepository();
    const createdProfile = await repository.create(mockProfileData);
    const retrievedProfile = await repository.getById(createdProfile._id);

		expect(retrievedProfile).toBeDefined();
		
    const { _id, __v, createdAt, ...retrievedProfileObject } = retrievedProfile;
    expect(retrievedProfileObject).toEqual(mockProfileData);
  });
});
