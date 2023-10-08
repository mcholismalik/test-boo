'use strict';

const swaggerJsdoc = require('swagger-jsdoc');
const { ResponseDto } = require('../model/base');
const {
  GetCommentQueryDto,
  CreateCommentBodyDto,
  LikeCommentBodyDto,
  UnlikeCommentBodyDto,
  CommentRespDto,
  CommentsRespDto,
} = require('../model/commentDto');
const {
  GetProfileByIDParamDto,
  CreateProfileBodyDto,
  ProfileRespDto,
  ProfilesRespDto,
} = require('../model/profileDto');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Boo World',
      version: '1.0.0',
      description: 'Technical Test at Boo World, by Muhammad Cholis Malik.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        ResponseDto,

        GetCommentQueryDto,
        CreateCommentBodyDto,
        LikeCommentBodyDto,
        UnlikeCommentBodyDto,
        CommentRespDto,
        CommentsRespDto,

        GetProfileByIDParamDto,
        CreateProfileBodyDto,
        ProfileRespDto,
        ProfilesRespDto,
      },
      parameters: {
        GetCommentQueryDto: {
          in: 'query',
          schema: {
            $ref: '#/components/schemas/GetCommentQueryDto',
          },
        },
      },
    },
  },
  apis: ['./src/handler/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
