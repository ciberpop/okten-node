const {emailActionEnum: {PRODUCT_PHOTO_CRON}} = require('../constants');
const {emailService, productService, userService} = require('../service');

module.exports = async () => {
    const products = await productService.getAllByParams({photo: null});

    for (const product of products) {
        const user = await userService.getOne(product.userId);
        await emailService.sendMail(user.email, PRODUCT_PHOTO_CRON, {product, user});
    }
}