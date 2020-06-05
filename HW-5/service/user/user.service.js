const db = require('../../dataBase').getInstance();
const {modelNamesEnum: {USER}} = require('../../constants');

module.exports = {
    getAll: () => {
        const UserModel = db.getModel(USER);

        return UserModel.findAll({});
    },

    getOne: (id) => {
        const UserModel = db.getModel(USER);

        return UserModel.findByPk(id);
    },

    getByParams: (params) => {
        const UserModel = db.getModel(USER);

        return UserModel.findOne({where: params});
    },

    create: (user) => {
        const UserModel = db.getModel(USER);

        return UserModel.create(user);
    },

    update: (user, id) => {
        const UserModel = db.getModel(USER);

        return UserModel.update(user, {where: id});
    },

    delete: (id) => {
        const UserModel = db.getModel(USER);

        return UserModel.destroy({where: id})
    }
}