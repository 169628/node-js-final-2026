const skillService = require("../services/skillService");

const skillController = {
    async getSkills(req, res, next) {
        try {
            const { statusCode, body } = await skillService.getAllSkills();
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },
    async createSkill(req, res, next) {
        try {
            const { statusCode, body } = await skillService.createSkill(req.body.name);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async deleteSkill(req, res, next) {
        try {
            const { statusCode, body } = await skillService.deleteSkill(req.params.skillId);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = skillController;
