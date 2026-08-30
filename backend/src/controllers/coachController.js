const coachService = require("../services/coachService");

const coachController = {

    async getCoaches(req, res, next) {
        try {
            const { statusCode, body } = await coachService.getCoaches(req.query);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async getCoach(req, res, next) {
        try {
            const { statusCode, body } = await coachService.getCoach(req.params.coachId);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async getCoachCourses(req, res, next) {
        try {
            const { statusCode, body } = await coachService.getCoachCourses(req.params.coachId);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

};

module.exports = coachController;
