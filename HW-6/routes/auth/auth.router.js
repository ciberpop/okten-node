const authRouter = require('express').Router();

const {authController} = require('../../controllers');
const {authMiddleware: {isUserValid, checkAccessToken, checkRefreshToken}} = require('../../middlewares');

authRouter.post('/', isUserValid, authController.loginUser);
authRouter.post('/logout',checkAccessToken, authController.logoutUser);
authRouter.post('/refresh', checkRefreshToken, authController.refreshToken);

module.exports = authRouter;