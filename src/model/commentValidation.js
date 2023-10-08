'use strict';

const GetCommentQueryValidation = {
  profileId: {
    in: ['query'],
    isString: true,
    optional: true,
    errorMessage: 'Profile ID should be a string.',
  },
  mbti: {
    in: ['query'],
    isBoolean: true,
    optional: true,
    errorMessage: 'MBTI should be a boolean.',
  },
  enneagram: {
    in: ['query'],
    isBoolean: true,
    optional: true,
    errorMessage: 'Enneagram should be a boolean.',
  },
  zodiac: {
    in: ['query'],
    isBoolean: true,
    optional: true,
    errorMessage: 'Zodiac should be a boolean.',
  },
  page: {
    in: ['query'],
    isInt: {
      options: { min: 1 },
      errorMessage: 'Page should be a positive integer.',
    },
    optional: true,
  },
  limit: {
    in: ['query'],
    isInt: {
      options: { min: 1 },
      errorMessage: 'Limit should be a positive integer.',
    },
    optional: true,
  },
  sort: {
    in: ['query'],
    isString: true,
    optional: true,
    isIn: {
      options: [['recent', 'best']],
      errorMessage: 'Sort should be "recent" or "best".',
    },
  },
};

const CreateCommentBodyValidation = {
  profileId: {
    in: ['body'],
    isString: true,
    isHexadecimal: true,
    notEmpty: true,
		isLength: {
			options: { min: 24, max: 24 },
		},
    errorMessage: 'Profile ID is required and should be ID format.',
  },
  title: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Title is required and should be a string.',
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
    optional: true,
    errorMessage: 'MBTI should be a string.',
  },
  enneagram: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Enneagram should be a string.',
  },
  zodiac: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Zodiac should be a string.',
  },
  createdBy: {
    in: ['body'],
    isString: true,
    isHexadecimal: true,
    notEmpty: true,
		isLength: {
			options: { min: 24, max: 24 },
		},
    errorMessage: 'Created By is required and should be ID format.',
  },
};

const LikeCommentBodyValidation = {
  commentId: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Comment ID is required and should be a string.',
  },
  profileId: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Profile ID is required and should be a string.',
  },
};

const UnlikeCommentBodyValidation = {
  commentId: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Comment ID is required and should be a string.',
  },
  profileId: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Profile ID is required and should be a string.',
  },
};

module.exports = { 
  GetCommentQueryValidation,
  CreateCommentBodyValidation, 
  LikeCommentBodyValidation, 
  UnlikeCommentBodyValidation
};
