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

class SwaggerDoc {
  constructor(config) {
    this.options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: config?.service || '',
          version: config?.version || '',
          description: config?.description || '',
        },
        servers: [
          {
            url: config?.baseurl+':'+config?.port || '',
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

    this.swaggerSpec = swaggerJsdoc(this.options);
  }

  getSpec() {
    return this.swaggerSpec;
  }
}

module.exports = SwaggerDoc;
