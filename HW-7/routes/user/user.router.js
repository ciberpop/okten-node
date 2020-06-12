const userRouter = require('express').Router();
const {userController} = require('../../controllers');
const {userMiddleware: {isUserExist, isNewUserValid, isUpdatedUserValid}} = require('../../middlewares');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', isUserExist, userController.getUser);
userRouter.post('/', isNewUserValid, userController.createUser);
userRouter.put('/:id', isUserExist, isUpdatedUserValid, userController.updateUser);
userRouter.delete('/:id', isUserExist, userController.deleteUser);

module.exports = userRouter;