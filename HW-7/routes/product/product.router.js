const productRouter = require('express').Router();

const {productController} = require('../../controllers/');
const {
    productMiddleware: {isProductExist, isProductValid},
    authMiddleware: {checkAccessToken}
} = require('../../middlewares/');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', isProductExist, productController.getProduct);
productRouter.post('/', isProductValid, checkAccessToken, productController.createProduct);
productRouter.put('/:id', isProductExist, isProductValid, checkAccessToken, productController.updateProduct);
productRouter.delete('/:id', isProductExist, checkAccessToken, productController.deleteProduct);

// productRouter.use('/:id', isProductExist);

module.exports = productRouter;