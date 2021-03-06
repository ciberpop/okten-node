const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const {
    emailActionEnum: {PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_UPDATE},
    responseStatusCodesEnum: {CREATED, OK, NOT_FOUND},
    responseCustomErrorsEnum: {NOT_CREATE, NOT_GET, NOT_UPDATE, NOT_DELETE}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {emailService, userService, productService} = require('../../service');

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const products = await productService.getAll();

            if (!products) return next(new ErrorHandler(NOT_GET.message, NOT_FOUND, NOT_GET.customCode));

            res.json(products);
        } catch (e) {
            next(e);
        }
    },

    getProduct: async (req, res, next) => {
        try {
            res.json(req.product);
        } catch (e) {
            next(e);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const product = req.body;
            const [profileImage] = req.photos;

            product.userId = req.userId;

            const isCreated = await productService.create(product);

            if (!isCreated) return next(new ErrorHandler(NOT_CREATE.message, NOT_FOUND, NOT_CREATE.customCode));

            if (profileImage) {
                const photoDir = `products/${isCreated.id}/photos`;
                const fileExtension = profileImage.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
                await profileImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
                await productService.update(isCreated.id, {photo: `/${photoDir}/${photoName}`});
            }

            const user = await userService.getOne(req.userId);

            await emailService.sendMail(user.email, PRODUCT_CREATE, {user, product});

            res.sendStatus(CREATED);
        } catch (e) {
            next(e);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = req.body;
            const user = await userService.getOne(req.userId);
            const isUpdated = await productService.update(product, id);

            if (!isUpdated) return next(new ErrorHandler(NOT_UPDATE.message, NOT_FOUND, NOT_UPDATE.customCode));

            await emailService.sendMail(user.email, PRODUCT_UPDATE, {user, product});

            res.json(product);
        } catch (e) {
            next(e);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = await productService.getOne(id);
            const user = await userService.getOne(req.userId);
            const isDeleted =  await productService.delete(id);

            if (!isDeleted) return next(new ErrorHandler(NOT_DELETE.message, NOT_FOUND, NOT_DELETE.customCode));

            await emailService.sendMail(user.email, PRODUCT_DELETE, {user, product});

            res.json({deleted: true});
        } catch (e) {
            next(e);
        }
    },

    deleteImageProduct: async (req, res, next) => {
        try {
            // ! Sequalize method
            // req.product.photo = null;
            // const [isDeleted] = await req.product.save();
            // if (!isDeleted) return next(new ErrorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.customCode));
            // res.json({deleted: true});

            const {productId} = req.params;
            const isPhotoDeleted = await productService.update(productId, {photo: null});

            if (!isPhotoDeleted) return next(new ErrorHandler(NOT_DELETE.message, NOT_FOUND, NOT_DELETE.customCode));

            res.json({deleted: true});
        } catch (e) {
            next(e);
        }
    }
};