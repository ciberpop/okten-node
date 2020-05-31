const userRouter = require('express').Router();
const {userController} = require('../../controllers');
const {isUserExist, isUserValid} = require('../../middlewares');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', isUserExist, userController.getUser);
userRouter.post('/', isUserValid, userController.createUser);
userRouter.put('/:id', isUserExist, isUserValid, userController.updateUser);
userRouter.delete('/:id', isUserExist, userController.deleteUser);

module.exports = userRouter;