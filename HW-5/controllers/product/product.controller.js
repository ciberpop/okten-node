const {productService} = require('../../service');

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAll();

            res.json(products);
        } catch (e) {
            res.json(e);
        }
    },

    getProduct: async (req, res) => {
        try {
            const {id} = req.params;
            const products = await productService.getOne(id);

            res.json(products);
        } catch (e) {
            res.json(e);
        }
    },

    createProduct: async (req, res) => {
        try {
            const product = req.body;

            await productService.create(product);

            res.json({created: true});
        } catch (e) {
            res.json(e);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {id} = req.params;
            const product = req.body;

            await productService.update(product, id);

            res.json(product);
        } catch (e) {
            res.json(e);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const {id} = req.params;

            await productService.delete(id);

            res.json({deleted: true});
        } catch (e) {
            res.json(e);
        }
    }
};