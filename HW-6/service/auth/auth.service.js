const db = require('../../dataBase').getInstance();

const {TOKEN} = require('../../constants/modelName.enum');

module.exports = {
    getByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.findOne({where: params})
    },

    createTokenPair: (tokens) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.create(tokens);
    },

    deleteByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.destroy({where: params})
    }
}