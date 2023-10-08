'use strict';

const faker = require('faker');
const { IMAGE_DEFAULT } = require('../model/base');

class ProfileSeeder {
  constructor(profileDomain) {
    this.profileDomain = profileDomain;
  }

  async init() {
    const profiles = [];
    const numProfiles = 10;

    for (let i = 0; i < numProfiles; i++) {
      const profile = {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        mbti: faker.random.word(),
        enneagram: faker.random.word(),
        variant: faker.random.word(),
        tritype: faker.datatype.number(),
        socionics: faker.random.word(),
        sloan: faker.random.word(),
        psyche: faker.random.word(),
        image: IMAGE_DEFAULT,
      };

      profiles.push(profile);
    }
    
    return await this.profileDomain.creates(profiles);
  }
}

module.exports = ProfileSeeder;