const {Router} = require('express');
const router = Router();

const productRouter = require('./product/product.router');
const userRouter = require('./user/user.router');
const authRouter = require('./auth/auth.router');

const {notFoundController} = require('../controllers');

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/auth', authRouter);
router.use('/', notFoundController);


module.exports = router;