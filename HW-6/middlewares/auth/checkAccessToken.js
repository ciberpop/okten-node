const jwt = require('jsonwebtoken');

const {wordsForTokensEnum: {JWT_SECRET}, responseStatusCodesEnum} = require('../../constants');
const {authService} = require('../../service');
const {ErrorHandler, error} = require('../../error/');

module.exports = async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        if (!token) return next(new ErrorHandler(
            error.NOT_VALID_TOKEN.message,
            responseStatusCodesEnum.UNAUTHORIZED,
            error.NOT_VALID_TOKEN.code
        ));

        jwt.verify(token, JWT_SECRET, err => {
            if (err) throw new ErrorHandler(
                error.NOT_VALID_TOKEN.message,
                responseStatusCodesEnum.UNAUTHORIZED,
                error.NOT_VALID_TOKEN.code
            );
        })

        const tokensFromDB = await authService.getByParams({access_token: token});

        if (!tokensFromDB) return next(new ErrorHandler
        (
            error.NOT_VALID_TOKEN.message,
            responseStatusCodesEnum.UNAUTHORIZED,
            error.NOT_VALID_TOKEN.code
        ));

        req.userId = tokensFromDB.userId;

        next();
    } catch (e) {
        next(e);
    }
}