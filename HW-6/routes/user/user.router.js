const userRouter = require('express').Router();
const {userController} = require('../../controllers');
const {userMiddleware: {isUserExist, isUserValid}} = require('../../middlewares');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', isUserExist, userController.getUser);
userRouter.post('/', isUserValid, userController.createUser);
userRouter.post('/auth', userController.loginUser);
userRouter.put('/:id', isUserExist, isUserValid, userController.updateUser);
userRouter.delete('/:id', isUserExist, userController.deleteUser);

module.exports = userRouter;