'use strict';

const { BuildResponseDto, PROFILE_DATA_MOCK: mock } = require('./base');

const GetProfileByIDParamDto = {
  type: 'string',
  pattern: '^[0-9a-fA-F]{24}$',
};

const CreateProfileBodyDto = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      example: mock.name,
    },
    description: {
      type: 'string',
      example: mock.description,
    },
    mbti: {
      type: 'string',
      minLength: 1,
      example: mock.mbti,
    },
    enneagram: {
      type: 'string',
      example: mock.enneagram,
    },
    variant: {
      type: 'string',
      example: mock.variant,
    },
    tritype: {
      type: 'number',
      example: mock.tritype,
    },
    socionics: {
      type: 'string',
      example: mock.socionics,
    },
    sloan: {
      type: 'string',
      example: mock.sloan,
    },
    psyche: {
      type: 'string',
      example: mock.psyche,
    },
    image: {
      type: 'string',
      example: mock.image,
    },
  },
  required: ['name', 'mbti'],
};

const baseProfile = {
  properties: {
    _id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    mbti: {
      type: 'string',
    },
    enneagram: {
      type: 'string',
    },
    variant: {
      type: 'string',
    },
    tritype: {
      type: 'number',
    },
    socionics: {
      type: 'string',
    },
    sloan: {
      type: 'string',
    },
    psyche: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
  },
};

const ProfileRespDto = BuildResponseDto({
  type: 'object',
  ...baseProfile,
});

const ProfilesRespDto = BuildResponseDto({
  type: 'array',
  items: {
    ...baseProfile,
  },
});

module.exports = {
  GetProfileByIDParamDto,
  CreateProfileBodyDto,
  ProfileRespDto,
  ProfilesRespDto,
};
