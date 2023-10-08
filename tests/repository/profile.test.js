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

  it('should creates some profile', async () => {
    const repository = new ProfileRepository();
    const createdProfiles = await repository.creates([mockProfileData]);
    
    expect(createdProfiles).toBeDefined();
		expect(createdProfiles.length).toBeGreaterThan(0);
  });

  it('should retrieve a profile by ID', async () => {
    const repository = new ProfileRepository();
    const createdProfile = await repository.create(mockProfileData);
    const retrievedProfile = await repository.getById(createdProfile._id);

		expect(retrievedProfile).toBeDefined();
		
    const { _id, __v, createdAt, ...retrievedProfileObject } = retrievedProfile;
    expect(retrievedProfileObject).toEqual(mockProfileData);
  });

  it('should not retrieve a profile by ID', async () => {
    const repository = new ProfileRepository();
    const mockId = '6522bc057abe8f908409ed2f';
    const retrievedProfile = await repository.getById(mockId);

		expect(retrievedProfile).toBeNull();
	});

  it('should retrieve profiles', async () => {
    const repository = new ProfileRepository();
    await repository.create(mockProfileData);
    const retrievedProfiles = await repository.get();

		expect(retrievedProfiles).toBeDefined();
		expect(retrievedProfiles.length).toBeGreaterThan(0);
  });
});
