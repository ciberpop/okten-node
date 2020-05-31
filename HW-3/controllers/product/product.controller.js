const productService = require('../../service');

module.exports = {
    createProduct: async (req, res) => {
        const {id, title, count, price} = req.body;
        const product = new productService(id, title, count, price);

        await product.createProduct()

        res.json({created: true})
    },

    getAllProducts: async (req, res) => {
        const products = await productService.getAllProducts();

        res.json(products)
    },

    getProduct: async (req, res) => {
        const {id} = req.params;
        const product = await productService.getProduct(id)

        res.json(product)
    },

    updateProduct: async (req, res) => {
        const {id} = req.params;
        const {title, count, price} = req.body;
        const product = new productService(id, title, count, price)

        await product.updateProduct();

        res.json({updated: true});
    },

    deleteProduct: async (req, res) => {
        const {id} = req.params

        await productService.deleteProduct(id)

        res.json({deleted: true})
    }
};