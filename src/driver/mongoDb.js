'use strict';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ProfileEntity } = require('../model/profileEntity');
const { CommentEntity } = require('../model/commentEntity');

class MongoDb {
  constructor() {
    this.instance = null;
  }

  async init() {
    this.instance = await MongoMemoryServer.create();
    const mongoUri = this.instance.getUri();

    mongoose.model('Profile', ProfileEntity);
    mongoose.model('Comment', CommentEntity);

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async close() {
    if (this.instance) {
      await mongoose.disconnect();
      await this.instance.stop();
    }
  }
}

module.exports = MongoDb;
