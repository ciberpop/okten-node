const authMiddleware = require('./auth');
const productMiddleware = require('./product');
const userMiddleware = require('./user');

module.exports = {
    authMiddleware,
    productMiddleware,
    userMiddleware
}