const Joi = require('joi');

const {ErrorHandler} = require('../../error/ErrorHandler');
const {productValidationSchema} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const product = req.body;

        const {error} = Joi.validate(product, productValidationSchema);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 404))
        }

        next();
    } catch(e) {
        next(e);
    }
}