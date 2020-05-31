const productService = require('../../service/product/product.service');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productService.getProduct(id);

        if(!product) throw new Error('Product is not Exist!');

        next();
    } catch(e) {
        res.json({error: true})
    }

}