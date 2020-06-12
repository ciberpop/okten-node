const Joi = require('joi');

const {regexpEnum: {EMAIL}} = require('../../constants');

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).required(),
    email: Joi.string().trim().regex(EMAIL).required(),
    password: Joi.string().min(6).required()
})