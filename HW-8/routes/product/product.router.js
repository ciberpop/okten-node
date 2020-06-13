const productRouter = require('express').Router();

const {productController} = require('../../controllers/');
const {
    authMiddleware: {checkAccessToken},
    fileUploadMiddleware: {isFileUploadValid, isPhotoCountValid},
    productMiddleware: {isProductExist, isProductValid},
} = require('../../middlewares/');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', isProductExist, productController.getProduct);
productRouter.post(
    '/',
    isProductValid,
    checkAccessToken,
    isFileUploadValid,
    isPhotoCountValid,
    productController.createProduct
);
productRouter.put('/:id', isProductExist, isProductValid, checkAccessToken, productController.updateProduct);
productRouter.delete('/:id', isProductExist, checkAccessToken, productController.deleteProduct);
productRouter.delete('/:id/image', isProductExist, checkAccessToken, productController.deleteImageProduct);

// productRouter.use('/:id', isProductExist);

module.exports = productRouter;