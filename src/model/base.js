'use strict';

const IMAGE_DEFAULT = 'https://avatars.githubusercontent.com/u/20102519?v=4';

const COMMENT_SORT_BY_BEST = 'best';
const COMMENT_SORT_BY_RECENT = 'recent';

const PROFILE_DATA_MOCK = {
	name: 'Malik',
	description: 'Senior Software Engineer',
	mbti: 'ENTJ',
	enneagram: '1w2',
	variant: 'Self-Preservation',
	tritype: 135,
	socionics: 'ILI (INTp)',
	sloan: 'RCUE',
	psyche: 'Ego',
	image: IMAGE_DEFAULT,
};
const PROFILE_DATA_MOCK_2 = {
	name: 'Asha',
	description: 'Swim Coach',
	mbti: 'ESTP',
	enneagram: '1w2',
	variant: 'Self-Preservation',
	tritype: 135,
	socionics: 'ILI (INTp)',
	sloan: 'RCUE',
	psyche: 'Ego',
	image: IMAGE_DEFAULT,
};
const COMMENT_DATA_MOCK = {
	profileId: 'your_profile_id',
	title: 'Sample Comment',
	description: 'This is a sample comment',
	mbti: 'ENTJ',
	enneagram: '1w2',
	zodiac: 'Virgo',
	likes: [],
};

const baseMeta = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
    },
    status: {
      type: 'integer',
    },
    timestamp: {
      type: 'string',
      format: 'date-time'
    },
    message: {
      type: 'string',
    }
  }
};

const ResponseDto = {
  type: 'object',
  properties: {
    meta: baseMeta,
    data: {
      type: 'object',
    },
  }
};

const BuildResponseDto = (child) => {
  return {
    type: 'object',
    properties: {
      meta: baseMeta,
      data: {
        type: 'object',
        ...child
      },
    },
  }
};

module.exports = {
  // constant
  IMAGE_DEFAULT,
  COMMENT_SORT_BY_BEST,
  COMMENT_SORT_BY_RECENT,
  PROFILE_DATA_MOCK,
  PROFILE_DATA_MOCK_2,
  COMMENT_DATA_MOCK,

  // dto
  ResponseDto,
  BuildResponseDto,
};
