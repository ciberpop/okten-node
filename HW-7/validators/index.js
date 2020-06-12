const authValidationSchema = require('./auth');
const numberIdValidationSchema = require('./utils');
const productValidationSchema = require('./product');
const userValidationSchema = require('./user');

module.exports = {
    authValidationSchema,
    numberIdValidationSchema,
    productValidationSchema,
    userValidationSchema
};