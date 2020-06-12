const authRouter = require('express').Router();

const {authController} = require('../../controllers');
const {authMiddleware: {isAuthUserValid, checkAccessToken, checkRefreshToken}} = require('../../middlewares');

authRouter.post('/', isAuthUserValid, authController.loginUser);
authRouter.post('/logout',checkAccessToken, authController.logoutUser);
authRouter.post('/refresh', checkRefreshToken, authController.refreshToken);

module.exports = authRouter;