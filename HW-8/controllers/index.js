const productController = require('./product/product.controller');
const userController = require('./user/user.controller');
const authController = require('./auth/auth.controller');
const notFoundController = require('./404/404.controller');

module.exports = {
    productController,
    notFoundController,
    userController,
    authController
};