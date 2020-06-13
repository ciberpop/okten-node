const userRouter = require('express').Router();
const {userController} = require('../../controllers');
const {
    fileUploadMiddleware: {isFileUploadValid, isPhotoCountValid},
    userMiddleware: {isUserExist, isNewUserValid, isUpdatedUserValid},
} = require('../../middlewares');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', isUserExist, userController.getUser);
userRouter.post('/', isNewUserValid, isFileUploadValid, isPhotoCountValid, userController.createUser);
userRouter.put('/:id', isUserExist, isFileUploadValid, isPhotoCountValid, isUpdatedUserValid, userController.updateUser);
userRouter.delete('/:id', isUserExist, userController.deleteUser);

module.exports = userRouter;