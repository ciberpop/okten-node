const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const {
    emailActionEnum: {USER_REGISTER, USER_DELETE, USER_UPDATE},
    responseStatusCodesEnum: {CREATED, NOT_FOUND: NOT_FOUND_CODE, UNAUTHORIZED},
    responseCustomErrorsEnum: {NOT_CREATE, NOT_GET, NOT_UPDATE, NOT_DELETE, NOT_FOUND}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {hashPassword, checkHashPasswords} = require('../../helpers');
const {emailService, userService} = require('../../service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll();

            if (!users) return next(new ErrorHandler(NOT_GET.message, NOT_FOUND_CODE, NOT_GET.customCode));

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
            const [profileImage] = req.photos;
            const password = user.password;

            user.password = await hashPassword(user.password);

            const {id} = await userService.create(user);

            if (profileImage) {
                const photoDir = `users/${id}/photos`;
                const fileExtension = profileImage.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
                await profileImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
                await userService.update(id, {photo: `/${photoDir}/${photoName}`});
            }

            await emailService.sendMail(user.email, USER_REGISTER, {user, password});

            res.sendStatus(CREATED);
        } catch (e) {
            next(e);
        }
    },


    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getByParams({email});

            if (!user) next(new ErrorHandler(NOT_FOUND.message, UNAUTHORIZED, NOT_FOUND.customCode));

            await checkHashPasswords(user.password, password);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = req.body;
            const userFromDB = await userService.getOne(id);

            user.password = await hashPassword(user.password);

            const isUpdated = await userService.update(user, {id});

            if (!isUpdated) return next(new ErrorHandler(NOT_UPDATE.message, NOT_FOUND_CODE, NOT_UPDATE.customCode));

            await emailService.sendMail(userFromDB.email, USER_UPDATE, {user});

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await userService.getOne(id);
            const isDeleted = await userService.delete({id});

            if (!isDeleted) return next(new ErrorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.customCode));

            await emailService.sendMail(user.email, USER_DELETE, {userName: user.name});

            res.json({deleted: true});
        } catch (e) {
            next(e);
        }
    }
};