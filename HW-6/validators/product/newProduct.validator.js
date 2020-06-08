const Joi = require('joi');

module.exports = Joi.object().keys({
    title: Joi.string().trim().min(2).max(50).required(),
    price: Joi.number().min(1).max(10000000).required(),
    description: Joi.string().min(10).max(500).required()
})
