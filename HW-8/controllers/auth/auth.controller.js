const {
    responseStatusCodesEnum: {UNAUTHORIZED, OK},
    responseCustomErrorsEnum: {NOT_FOUND}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {tokenizer, checkHashPasswords} = require('../../helpers');
const {authService, userService} = require('../../service');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getByParams({email});

            if (!user) return next(new ErrorHandler(NOT_FOUND.message, UNAUTHORIZED, NOT_FOUND.customCode));

            await checkHashPasswords(user.password, password);

            const tokens = tokenizer();

            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            await authService.deleteByParams({access_token});

            res.sendStatus(OK);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization');
            const userId = req.userId;

            const user = await userService.getOne(userId);

            if (!user) return next(new ErrorHandler(NOT_FOUND.message, NOT_FOUND, NOT_FOUND.customCode));

            const tokens = tokenizer();

            await authService.deleteByParams({refresh_token});
            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};