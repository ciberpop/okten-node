const productRouter = require('express').Router();
const {productController} = require('../../controllers/');
const {isProductExist, isProductValid} = require('../../middlewares/');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', isProductExist, productController.getProduct);
productRouter.post('/', isProductValid, productController.createProduct);
productRouter.put('/:id', isProductExist, isProductValid, productController.updateProduct);
productRouter.delete('/:id', isProductExist, productController.deleteProduct);

// productRouter.use('/:id', isProductExist);

module.exports = productRouter;