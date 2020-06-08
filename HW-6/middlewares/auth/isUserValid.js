const Joi = require('joi');

const {authValidationSchema: {loginUserValidator}} = require('../../validators');
const {ErrorHandler, error: {NOT_VALID_USER}} = require('../../error/');
const {responseStatusCodesEnum: {BAD_REQUEST}} = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const user = req.body;
        const {error} = Joi.validate(user, loginUserValidator);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID_USER))
        }

        next();
    } catch (e) {
        next(e);
    }
}