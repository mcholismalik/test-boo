'use strict';

const GetProfileByIDParamValidation = {
  id: {
    in: ['params'],
    isHexadecimal: {
      errorMessage: 'Invalid ID format',
    },
    isLength: {
      options: { min: 24, max: 24 },
    },
  },
};

const CreateProfileBodyValidation = {
  name: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Name is required and should be a string.',
  },
  description: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Description should be a string.',
  },
  mbti: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'MBTI is required and should be a string.',
  },
  enneagram: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Enneagram should be a string.',
  },
  variant: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Variant should be a string.',
  },
  tritype: {
    in: ['body'],
    isNumeric: true,
    optional: true,
    errorMessage: 'Tritype should be a number.',
  },
  socionics: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Socionics should be a string.',
  },
  sloan: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Sloan should be a string.',
  },
  psyche: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Psyche should be a string.',
  },
  image: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Image should be a string.',
  },
};

module.exports = {
  GetProfileByIDParamValidation,
  CreateProfileBodyValidation,
};
