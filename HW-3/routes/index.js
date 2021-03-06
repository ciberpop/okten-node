const {Router} = require('express');
const router = Router();

const productRouter = require('./product/product.router');

const {notFoundController} = require('../controllers');


router.use('/products', productRouter);
router.use('/', notFoundController);


module.exports = router;