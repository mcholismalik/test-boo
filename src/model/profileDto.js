'use strict';

const GetProfileByIDParamDto = {
  type: 'string',
  pattern: '^[0-9a-fA-F]{24}$'
};

const CreateProfileBodyDto = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    description: {
      type: 'string',
    },
    mbti: {
      type: 'string',
      minLength: 1,
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
  required: ['name', 'mbti'],
};

module.exports = { 
  GetProfileByIDParamDto,
  CreateProfileBodyDto
};
