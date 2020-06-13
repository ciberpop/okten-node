const db = require('../../dataBase').getInstance();
const {modelNamesEnum: {PRODUCT}} = require('../../constants');

module.exports = {
    getAll: () => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findAll({});
    },

    getOne: (id) => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findByPk(id);
    },

    getAllByParams(params) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findAll({where: params});
    },

    create: (product) => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.create(product);
    },

    update: (id, newProductFields) => {
        const UserModel = db.getModel(PRODUCT);

        return UserModel.update(newProductFields, {where: {id}});
    },

    delete: (id) => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.destroy({where: {id}})
    }
}