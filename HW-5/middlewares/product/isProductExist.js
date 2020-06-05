const {ErrorHandler} = require('../../error/ErrorHandler');

module.exports = async (req, res , next) => {
    try {
        const {id} = req.params;

        if (isNaN(id) || +id < 0) throw next(new ErrorHandler('Product id is not valid', 400));

        next();
    } catch (e) {
        next(e);
    }

}