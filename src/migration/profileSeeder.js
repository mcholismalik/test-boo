'use strict';

const faker = require('faker');
const { IMAGE_DEFAULT } = require('../model/base');

class ProfileSeeder {
  constructor(profileDomain) {
    this.profileDomain = profileDomain;
  }

  async init() {
    const profiles = [];
    const numProfiles = 5;

    const mbtiOptions = ['INTJ', 'ENTJ', 'ENTP'];
    const enneagramOptions = ['1w2', '2w3', '3w2'];

    for (let i = 0; i < numProfiles; i++) {
      const profile = {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        mbti: mbtiOptions[Math.floor(Math.random() * mbtiOptions.length)],
        enneagram: enneagramOptions[Math.floor(Math.random() * enneagramOptions.length)],
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