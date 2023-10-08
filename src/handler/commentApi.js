'use strict';

const express = require('express');
const { validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');
const {
  CreateCommentBodyValidation,
  GetCommentQueryValidation,
  LikeCommentBodyValidation,
  UnlikeCommentBodyValidation,
} = require('../model/commentValidation');
const ResponseUtil = require('../util/response');
const { COMMENT_SORT_BY_RECENT } = require('../model/base');

class CommentApiHandler {
  constructor(logger, commentUsecase) {
    this.logger = logger;
    this.commentUsecase = commentUsecase;
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.post('/api/comment', checkSchema(CreateCommentBodyValidation), this.validate, this.create.bind(this));
    this.router.get('/api/comment', checkSchema(GetCommentQueryValidation), this.get.bind(this));
    this.router.patch('/api/comment/like', checkSchema(LikeCommentBodyValidation), this.validate, this.like.bind(this));
    this.router.patch('/api/comment/unlike', checkSchema(UnlikeCommentBodyValidation), this.validate, this.unlike.bind(this));
  }

  validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseUtil.badRequest(res, 'Validation failed', errors);
    }
    next();
  }

  /**
   * @swagger
   * /api/comment:
   *   get:
   *     summary: Get comments.
   *     tags: [Comment]
   *     parameters:
   *       - name: GetCommentQueryDto
   *         in: query
   *         required: false
   *         schema:
   *           $ref: '#/components/schemas/GetCommentQueryDto'
   *     responses:
   *       '200':
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CommentsRespDto'
   *       '400':
   *         description: Bad request.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResponseDto'
   *       '500':
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResponseDto'
   */
  async get(req, res, next) {
    try {
      const filterOptions = {
        profileId: req.query.profileId || null,
        mbti: req.query.mbti || null,
        enneagram: req.query.enneagram || null,
        zodiac: req.query.zodiac || null,
      };
      const sortOption = req.query.sort || COMMENT_SORT_BY_RECENT;

      const comments = await this.commentUsecase.get(filterOptions, sortOption);

      ResponseUtil.ok(res, 'Success get comments', comments);
    } catch (err) {
      this.logger.error(err);
      ResponseUtil.internalServerError(res, 'Failed get comments', err);
    }
  }

  /**
   * @swagger
   * /api/comment:
   *   post:
   *     summary: Create a new comment.
   *     tags: [Comment]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCommentBodyDto'
   *     responses:
   *       201:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CommentRespDto'
   *       400:
   *         description: Bad request.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResponseDto'
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResponseDto'
   */
  async create(req, res, next) {
    try {
      const body = req.body;
      const data = await this.commentUsecase.create(body);

      if (!data) {
        return ResponseUtil.unProcessableEntity(res, 'Failed create comment');
      }

      ResponseUtil.created(res, 'Success create comment', data);
    } catch (err) {
      this.logger.error(err);
      ResponseUtil.internalServerError(res, 'Failed create comment', err);
    }
  }

  /**
   * @swagger
   * /api/comment/like:
   *   patch:
   *     summary: Like a comment.
   *     tags: [Comment]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LikeCommentBodyDto'
   *     responses:
   *       '200':
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CommentRespDto'
   *       '400':
   *         description: Bad request.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResponseDto'
   *       '500':
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResponseDto'
   */
  async like(req, res, next) {
    try {
      const { commentId, profileId } = req.body;
      const updatedComment = await this.commentUsecase.like(commentId, profileId);

      if (!updatedComment) {
        return ResponseUtil.unProcessableEntity(res, 'Failed like comment');
      }

      ResponseUtil.ok(res, 'Success like comment', updatedComment);
    } catch (err) {
      this.logger.error(err);
      ResponseUtil.internalServerError(res, 'Failed like comment', err);
    }
  }

  /**
   * @swagger
   * /api/comment/unlike:
   *   patch:
   *     summary: Unlike a comment.
   *     tags: [Comment]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UnlikeCommentBodyDto'
   *     responses:
   *       '200':
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CommentRespDto'
   *       '400':
   *         description: Bad request.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResponseDto'
   *       '500':
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResponseDto'
   */
  async unlike(req, res, next) {
    try {
      const { commentId, profileId } = req.body;
      const updatedComment = await this.commentUsecase.unlike(commentId, profileId);

      if (!updatedComment) {
        return ResponseUtil.unProcessableEntity(res, 'Failed unlike comment');
      }

      ResponseUtil.ok(res, 'Success unlike comment', updatedComment);
    } catch (err) {
      this.logger.error(err);
      ResponseUtil.internalServerError(res, 'Failed unlike comment', err);
    }
  }
}

module.exports = CommentApiHandler;
