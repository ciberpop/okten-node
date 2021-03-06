const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorsEnum: {NOT_VALID}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {userValidationSchema: {updateUserValidator}} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const user = req.body;
        const {error} = Joi.validate(user, updateUserValidator);

        if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

        next();
    } catch (e) {
        next(e);
    }
};