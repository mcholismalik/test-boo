'use strict';

const express = require('express');
const { validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');
const { CreateProfileBodyValidation } = require('../model/profileValidation');
const ResponseUtil = require('../util/response');

class ProfileApiHandler {
  constructor(logger, profileUsecase) {
    this.logger = logger;
    this.profileUsecase = profileUsecase;
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.post('/api/profile', checkSchema(CreateProfileBodyValidation), this.validate, this.create.bind(this));
    this.router.get('/api/profile', this.get.bind(this));
  }

  validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseUtil.badRequest(res, 'Failed create profile', errors);
    }
    next();
  }

  /**
   * @swagger
   * /api/profile:
   *   post:
   *     summary: Create a new profile.
   *     tags: [Profile]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProfileBodyDto'
   *     responses:
   *       '201':
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProfileRespDto'
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
  async create(req, res, next) {
    try {        
      const body = req.body;
      const data = await this.profileUsecase.create(body);
      
      if (!data) {
        return ResponseUtil.unProcessableEntity(res, 'Failed create profile');
      }

      ResponseUtil.created(res, 'Success create profile', data);
    } catch (err) {
      this.logger.error(err);
      ResponseUtil.internalServerError(res, 'Failed create profile', err);
    }
  }

  /**
   * @swagger
   * /api/profile:
   *   get:
   *     summary: Get a list of profiles.
   *     tags: [Profile]
   *     responses:
   *       '200':
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ProfileRespDto'
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
      const profiles = await this.profileUsecase.get();
      
      if (!profiles) {
        return ResponseUtil.notFound(res, 'No profiles found');
      }

      ResponseUtil.ok(res, 'Success get profiles', profiles);
    } catch (err) {
      this.logger.error(err);
      ResponseUtil.internalServerError(res, 'Failed to retrieve profiles', err);
    }
  }
}

module.exports = ProfileApiHandler;