const {
    fileUploadEnum: {PHOTO_MIMETYPES, MAX_PHOTO_SIZE},
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorsEnum: {NOT_VALID}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
module.exports = (req, res, next) => {
    try {
        req.photos = [];

        if (!req.files) return next();

        const files = Object.values(req.files);

        for (let i = 0; i < files.length; i++) {
            const {mimetype, size} = files[i];
            if (PHOTO_MIMETYPES.includes(mimetype)) {

                if (size > MAX_PHOTO_SIZE) {
                    return next(
                        new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode)
                    );
                }

                req.photos.push(files[i]);
            } else {
                next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));
            }
        }

        next();
    } catch (e) {
        next(e);
    }
};