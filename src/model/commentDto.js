'use strict';

const { BuildResponseDto } = require('./base');

const GetCommentQueryDto = {
  type: 'object',
  properties: {
    mbti: {
      type: 'string',
    },
    enneagram: {
      type: 'string',
    },
    zodiac: {
      type: 'string',
    },
    sort: {
      type: 'string',
      enum: ['recent', 'best'],
    },
  },
};

const CreateCommentBodyDto = {
  type: 'object',
  properties: {
    profileId: {
      type: 'string',
      minLength: 1,
    },
    title: {
      type: 'string',
      minLength: 1,
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
	}
};

const CommentRespDto = BuildResponseDto(
  {
    type: 'object',
    ...baseComment
  }
);

const CommentsRespDto = BuildResponseDto(
  {
    type: 'array',
    items: {
      ...baseComment
    }
  }
);

module.exports = { 
  GetCommentQueryDto,
  CreateCommentBodyDto,
  LikeCommentBodyDto,
  UnlikeCommentBodyDto,
  CommentRespDto,
  CommentsRespDto
};
