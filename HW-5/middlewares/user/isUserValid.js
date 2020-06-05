const Joi = require('joi');

const {userValidationSchema} = require('../../validators');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req, res, next) => {
    try {
        const user = req.body;
        const {error} = Joi.validate(user, userValidationSchema);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 404))
        }

        next();
    } catch (e) {
        next(e);
    }
}