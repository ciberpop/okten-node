const Joi = require('joi');

const {
    responseCustomErrorsEnum: {NOT_VALID},
    responseStatusCodesEnum: {BAD_REQUEST}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {productValidationSchema: {newProductValidator}} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const product = req.body;

        const {error} = Joi.validate(product, newProductValidator);

        if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

        next();
    } catch(e) {
        next(e);
    }
}