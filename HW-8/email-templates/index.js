const {
    emailActionEnum:
        {
            USER_REGISTER,
            USER_DELETE,
            USER_UPDATE,
            PRODUCT_CREATE,
            PRODUCT_DELETE,
            PRODUCT_UPDATE,
            PRODUCT_PHOTO_CRON
        }
} = require('../constants');

module.exports = {
    [USER_REGISTER]: {
        subject: '[Node Shop] USER WAS REGISTERED!',
        templateFileName: 'createUser'
    },
    [USER_DELETE]: {
        subject: '[Node Shop] USER WAS DELETED!',
        templateFileName: 'deleteUser'
    },
    [USER_UPDATE]: {
        subject: '[Node Shop] USER WAS UPDATED!',
        templateFileName: 'updateUser'
    },
    [PRODUCT_CREATE]: {
        subject: '[Node Shop] PRODUCT WAS CREATED!',
        templateFileName: 'createProduct'
    },
    [PRODUCT_DELETE]: {
        subject: '[Node Shop] PRODUCT WAS DELETED!',
        templateFileName: 'deleteProduct'
    },
    [PRODUCT_UPDATE]: {
        subject: '[Node Shop] PRODUCT WAS UPDATED!',
        templateFileName: 'updateProduct'
    },
    [PRODUCT_PHOTO_CRON]: {
        subject: '[Node Shop] PLEASE ADD PHOTO TO YOUR PRODUCT!',
        templateFileName: 'cronPhotoProduct'
    }
}