const Joi = require('joi');

const {regexpEnum: {EMAIL}} = require('../../constants');

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).optional(),
    email: Joi.string().trim().regex(EMAIL).optional(),
    password: Joi.string().min(6).optional()
})