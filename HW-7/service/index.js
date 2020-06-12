const productService = require('./product/product.service');
const userService = require('./user/user.service');
const authService = require('./auth/auth.service');
const emailService = require('./email/email.service');

module.exports = {
    productService,
    userService,
    authService,
    emailService
};