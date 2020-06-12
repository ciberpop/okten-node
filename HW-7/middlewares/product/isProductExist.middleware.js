const Joi = require('joi');

const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE, BAD_REQUEST},
    responseCustomErrorsEnum: {NOT_VALID, NOT_FOUND}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {productService} = require('../../service');
const {numberIdValidationSchema: {numberIdSchema}} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {error} = Joi.validate(id, numberIdSchema);

        if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

        const product = await productService.getOne(id);

        if (!product) return next(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode));

        req.product = product;

        next();
    } catch (e) {
        next(e);
    }
};