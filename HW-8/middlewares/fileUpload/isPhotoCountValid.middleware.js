const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorsEnum: {NOT_VALID}
} = require('../../constants');
const {ErrorHandler} = require('../../error');

module.exports = (req, res, next) => {
    try {
        if (req.photos.length > 1) return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));

            next();
    } catch (e) {
        next(e);
    }
};