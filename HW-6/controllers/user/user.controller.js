const {userService} = require('../../service');
const {hashPassword, checkHashPasswords} = require('../../helpers');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUser: async (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            user.password = await hashPassword(user.password);

            await userService.create(user);

            res.json({created: true});
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getByParams({email});

            if (!user) {
                next(new ErrorHandler('User is not exist', 400, 4001));
            } 

            await checkHashPasswords(user.password, password);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {id} = req.params;
            const user = req.body;

            user.password = await hashPassword(user.password);
            await userService.update(user, {id});

            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            await userService.delete({id});

            res.json({deleted: true});
        } catch (e) {
            next(e);
        }
    }
};