const userService = require("../services/userService");

const userController = {
    
    async signup(req, res, next) {
        try {
            const { statusCode, body } = await userService.signup(req.body);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async login(req, res, next) {
        try {
            const { statusCode, body } = await userService.login(req.body);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async getProfile(req, res, next) {
        try {
            const { statusCode, body } = await userService.getProfile(req.user.id);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async updateName(req, res, next) {
        try {
            const { statusCode, body } = await userService.updateName(req.user.id, req.body.name);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async updatePassword(req, res, next) {
        try {
            const { statusCode, body } = await userService.updatePassword(req.user.id, req.body);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async getCreditPurchases(req, res, next) {
        try {
            const { statusCode, body } = await userService.getCreditPurchases(req.user.id);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async getCourseBookings(req, res, next) {
        try {
            const { statusCode, body } = await userService.getCourseBookings(req.user.id);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = userController;
