const ErrorHandler = require('../../error/ErrorHandler');
const {userService} = require('../../service');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;

        if (isNaN(id) || +id < 0) return next(new ErrorHandler('User is not valid', 404, 40444));

        const user = await userService.getOne(id);

        if (!user) return next(new ErrorHandler('User is not exist'));

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
}