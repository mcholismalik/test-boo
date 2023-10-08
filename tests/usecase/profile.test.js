'use strict';

// Unit Testing: Profile Usecase

const { PROFILE_DATA_MOCK } = require('../../src/model/base');
const ProfileUsecase = require('../../src/usecase/profile');

// mock
const mockProfileData = PROFILE_DATA_MOCK;
const mockProfileRepository = {
  create: jest.fn().mockResolvedValue(mockProfileData),
  getById: jest.fn().mockResolvedValue(mockProfileData),
};

// runner
describe('Profile Usecase', () => {
  it('should create a new profile', async () => {
    const usecase = new ProfileUsecase(mockProfileRepository);
    const profileCreated = await usecase.create(mockProfileData);

    expect(mockProfileRepository.create).toHaveBeenCalledWith(mockProfileData);
		expect(profileCreated).toEqual(mockProfileData);
  });

  it('should retrieve a profile by ID', async () => {
    const usecase = new ProfileUsecase(mockProfileRepository);
    const profileId = 'mock-profile-id';
    const profileRetreived = await usecase.getById(profileId);

    expect(mockProfileRepository.getById).toHaveBeenCalledWith(profileId);
		expect(profileRetreived).toEqual(mockProfileData)
  });
});