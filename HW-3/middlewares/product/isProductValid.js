const productService = require('../../service/product/product.service');

module.exports = async (req, res, next) => {
    try {
        const {title, price} = req.body;

        if (title.length < 3 && title.length > 20) throw new Error('Title is not valid');

        if (price < 0) throw new Error('Price is not valid');

        next();
    } catch(e) {
        res.json({error: true})
    }
}