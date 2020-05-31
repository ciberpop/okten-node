const {userService} = require('../../service');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAll();

            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    getUser: async (req, res) => {
        try {
            const {id} = req.params;
            const user = await userService.getOne(id);

            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },

    createUser: async (req, res) => {
        try {
            const user = req.body;

            await userService.create(user);

            res.json({created: true});
        } catch (e) {
            res.json(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {id} = req.params;
            const user = req.body;

            await userService.update(user, id);

            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;

            await userService.delete(id);

            res.json({deleted: true});
        } catch (e) {
            res.json(e);
        }
    }
};