'use strict';

const { BuildResponseDto, COMMENT_DATA_MOCK: mock } = require('./base');

const GetCommentQueryDto = {
  type: 'object',
  properties: {
    profileId: {
      type: 'string',
    },
    mbti: {
      type: 'boolean',
      example: false,
    },
    enneagram: {
      type: 'boolean',
      example: false,
    },
    zodiac: {
      type: 'boolean',
      example: false,
    },
    page: {
      type: 'integer',
      example: 1,
    },
    limit: {
      type: 'integer',
      example: 10,
    },
    sort: {
      type: 'string',
      enum: ['recent', 'best'],
      example: 'best',
    },
  },
};

const CreateCommentBodyDto = {
  type: 'object',
  properties: {
    profileId: {
      type: 'string',
    example: mock.profileId,
    minLength: 1,
    },
    title: {
      type: 'string',
      example: mock.title,
      minLength: 1,
    },
    description: {
      type: 'string',
      example: mock.description,
    },
    mbti: {
      type: 'string',
      example: mock.mbti,
    },
    enneagram: {
      type: 'string',
      example: mock.enneagram,
    },
    zodiac: {
      type: 'string',
      example: mock.zodiac,
    },
    createdBy: {
      type: 'string',
      example: mock.profileId,
      minLength: 1,
    },
  },
  required: ['profileId', 'title'],
};

const LikeCommentBodyDto = {
  type: 'object',
  properties: {
    commentId: {
      type: 'string',
    },
    profileId: {
      type: 'string',
    },
  },
  required: ['commentId', 'profileId'],
};

const UnlikeCommentBodyDto = {
  type: 'object',
  properties: {
    commentId: {
      type: 'string',
    },
    profileId: {
      type: 'string',
    },
  },
  required: ['commentId', 'profileId'],
};

const baseComment = {
  properties: {
    _id: {
      type: 'string',
    },
    profileId: {
      type: 'string',
    },
    title: {
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
    zodiac: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
    },
    createdBy: {
      type: 'string',
    },
  },
};

const CommentRespDto = BuildResponseDto({
  type: 'object',
  ...baseComment,
});

const CommentsRespDto = BuildResponseDto({
  type: 'array',
  items: {
    ...baseComment,
  },
});

module.exports = {
  GetCommentQueryDto,
  CreateCommentBodyDto,
  LikeCommentBodyDto,
  UnlikeCommentBodyDto,
  CommentRespDto,
  CommentsRespDto,
};
