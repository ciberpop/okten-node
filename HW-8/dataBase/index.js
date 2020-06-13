const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const {configs: {DB_NAME, DB_HOST, DB_PASS, DB_USER}} = require('../config');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(
            DB_NAME,
            DB_USER,
            DB_PASS, {
            host: DB_HOST,
            dialect: 'mysql'
        })

        let models = {};

        function getModels() {
            fs.readdir(path.join(process.cwd(), 'dataBase', 'models'), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(path.join(process.cwd(), 'dataBase', 'models', modelName));
                })
            })
        }


            return {
                setModels: () => getModels(),
                getModel: (modelName) => models[modelName]
            }
        }



    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }
            return instance;
        }
    }
})()