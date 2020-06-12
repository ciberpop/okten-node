const isUserExist = require('./isUserExist.middleware');
const isNewUserValid = require('./isNewUserValid.middleware');
const isUpdatedUserValid = require('./isUpdatedUserValid.middleware');

module.exports = {
    isUserExist,
    isNewUserValid,
    isUpdatedUserValid
}