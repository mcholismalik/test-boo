'use strict';

const mongoose = require('mongoose');
const { ProfileEntity } = require('../model/profileEntity');

class ProfileRepository {
  constructor(cache) {
    this.cache = cache;
    this.cacheKey = 'profile:';
    this.cacheExpInSec = 10;
  }

  async create(profile) {
    const ProfileModel = mongoose.model('Profile', ProfileEntity);
    const createdProfile = await ProfileModel.create(profile);
    return createdProfile.toObject();
  }

  async creates(profiles) {
    const ProfileModel = mongoose.model('Profile', ProfileEntity);
    const createdProfiles = await ProfileModel.insertMany(profiles);
    return createdProfiles.map((profile) => profile.toObject());
  }

  async getById(id) {
    const cachedProfile = await this.cache.get(this.cacheKey+id);
    if (cachedProfile) {
      return JSON.parse(cachedProfile);
    }

    const ProfileModel = mongoose.model('Profile', ProfileEntity);
    const objectId = new mongoose.Types.ObjectId(id);
    const retrievedProfile = await ProfileModel.findById(objectId);

    if (retrievedProfile) {
      await this.cache.set(this.cacheKey+id, JSON.stringify(retrievedProfile.toObject()), this.cacheExpInSec);
      return retrievedProfile.toObject();
    }

    return null;
  }

  async get() {
    const ProfileModel = mongoose.model('Profile', ProfileEntity);
    return await ProfileModel.find().lean();
  }
}

module.exports = ProfileRepository;
