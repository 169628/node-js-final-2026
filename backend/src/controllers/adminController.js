const adminService = require("../services/adminService");

const adminController = {
    
    async updateRole(req, res, next) {
        try {
            const { statusCode, body } = await adminService.updateRole(req.params.userId,req.body);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async getProfile(req, res, next) {
        try {
            const { statusCode, body } = await adminService.getProfile(req.user.id);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async getRevenue(req, res, next) {
        try {
            const { statusCode, body } = await adminService.getRevenue(req.user.id, req.query);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async updateProfile(req, res, next) {
        try {
            const { statusCode, body } = await adminService.updateProfile(req.user.id,req.body);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = adminController;
