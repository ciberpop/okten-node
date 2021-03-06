const db = require('../../dataBase').getInstance();
const {PRODUCT} = require('../../constants');

module.exports = {
    getAll: () => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findAll({});
    },

    getOne: (id) => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findByPk(id);
    },

    create: (product) => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.create(product);
    },

    update: (product, id) => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.update(product, {where: {id}});
    },

    delete: (id) => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.destroy({where: {id}})
    }
}