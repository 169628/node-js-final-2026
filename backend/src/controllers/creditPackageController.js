const creditPackageService = require("../services/creditPackageService");

const creditPackageController = {
    async getCreditPackages(req, res, next) {
        try {
            const { statusCode, body } = await creditPackageService.getAllCreditPackages();
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },
    async createCreditPackage(req, res, next) {
        try {
            const { statusCode, body } = await creditPackageService.createCreditPackage(req.body);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async deleteCreditPackage(req, res, next) {
        try {
            const { statusCode, body } = await creditPackageService.deleteSkill(req.params.creditPackageId);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = creditPackageController;
