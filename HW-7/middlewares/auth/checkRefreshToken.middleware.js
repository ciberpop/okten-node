const jwt = require('jsonwebtoken');

const {JWT_REFRESH_SECRET} = require('../../config');
const {
    responseStatusCodesEnum: {UNAUTHORIZED, BAD_REQUEST},
    responseCustomErrorsEnum: {NOT_VALID_TOKEN, NOT_VALID}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {authService} = require('../../service');

module.exports = async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        if (!token) return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));

        jwt.verify(token, JWT_REFRESH_SECRET, err => {
            if (err) throw new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, NOT_VALID_TOKEN.customCode);
        })

        const tokensFromDB = await authService.getByParams({refresh_token: token});

        if (!tokensFromDB) return next(new ErrorHandler(
            NOT_VALID_TOKEN.message,
            UNAUTHORIZED,
            NOT_VALID_TOKEN.code
        ));

        req.userId = tokensFromDB.userId;

        next();
    } catch (e) {
        next(e);
    }
};