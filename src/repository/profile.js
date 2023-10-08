'use strict';

const mongoose = require('mongoose');
const { ProfileEntity } = require('../model/profileEntity');

class ProfileRepository {
  constructor() {}

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
    const ProfileModel = mongoose.model('Profile', ProfileEntity);
    const objectId = new mongoose.Types.ObjectId(id);
    const retrievedProfile = await ProfileModel.findById(objectId);
    return retrievedProfile ? retrievedProfile.toObject() : null;
  }

  async get() {
    const ProfileModel = mongoose.model('Profile', ProfileEntity);
    return await ProfileModel.find().lean();
  }
}

module.exports = ProfileRepository;
