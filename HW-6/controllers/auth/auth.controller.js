const {authService, userService} = require('../../service');
const {tokenizer, checkHashPasswords} = require('../../helpers');
const {ErrorHandler, error} = require('../../error');
const {responseStatusCodesEnum} = require('../../constants');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getByParams({email});

            if (!user) return next(new ErrorHandler(error.NOT_VALID_USER, responseStatusCodesEnum.UNAUTHORIZED, error.NOT_VALID_USER));

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

            res.sendStatus(responseStatusCodesEnum.OK);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization');
            const userId = req.userId;

            const user = await userService.getOne(userId);

            if (!user) return next(new ErrorHandler(
                error.NOT_FOUND.message,
                responseStatusCodesEnum.NOT_FOUND,
                error.NOT_FOUND.code
            ));

            const tokens = tokenizer();

            await authService.deleteByParams({refresh_token});
            await authService.createTokenPair(tokens);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};