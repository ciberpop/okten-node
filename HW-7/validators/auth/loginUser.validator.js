const Joi = require('joi');

const {regexpEnum: {EMAIL}} = require('../../constants');

module.exports = Joi.object().keys({
    email: Joi.string().trim().regex(EMAIL).required(),
    password: Joi.string().min(6).required()
})