const authMiddleware = require('./auth');
const fileUploadMiddleware = require('./fileUpload');
const productMiddleware = require('./product');
const userMiddleware = require('./user');

module.exports = {
    authMiddleware,
    fileUploadMiddleware,
    productMiddleware,
    userMiddleware
}