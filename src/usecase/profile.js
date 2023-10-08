'use strict';

class ProfileUsecase {
  constructor(profileRepository) {
    this.profileRepository = profileRepository;
  }

  async create(profile) {
    return await this.profileRepository.create(profile);
  }

  async getById(id) {
    return await this.profileRepository.getById(id);
  }

  async get() {
    return await this.profileRepository.get();
  }
}
  
module.exports = ProfileUsecase;