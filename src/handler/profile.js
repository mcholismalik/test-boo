'use strict';

const express = require('express');
const { validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');
const { GetProfileByIDParamValidation } = require('../model/profileValidation');

class ProfileHandler {
  constructor(logger, profileUsecase) {
    this.logger = logger;
    this.profileUsecase = profileUsecase;
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.get(
      '/profile/:id',
      checkSchema(GetProfileByIDParamValidation),
      this.validate.bind(this),
      this.getById.bind(this),
    );
  }

  validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('profile_not_found_template');
    }
    next();
  }

  async getById(req, res, next) {
    try {
      const param = req.params.id;
      const profile = await this.profileUsecase.getById(param);

      if (!profile) {
        return res.render('profile_not_found_template');
      }

      res.render('profile_template', { profile });
    } catch (err) {
      this.logger.error(err);
      res.render('profile_not_found_template');
    }
  }
}

module.exports = ProfileHandler;
