const {Router} = require('express');
const router = Router();

const authRouter = require('./auth/auth.router');
const userRouter = require('./user/user.router');
const productRouter = require('./product/product.router');

const {notFoundController} = require('../controllers');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/', notFoundController);


module.exports = router;