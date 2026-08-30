const courseService = require("../services/courseService");

const courseController = {
    
    async createCourse(req, res, next) {
        try {
            const { statusCode, body } = await courseService.createCourse(req.user.id,req.body);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async getCourses(req, res, next) {
        try {
            const { statusCode, body } = await courseService.getCourses(req.user.id);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async getCourse(req, res, next) {
        try {
            const { statusCode, body } = await courseService.getCourse(req.user.id,req.params.courseId);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

    async updateCourse(req, res, next) {
        try {
            const { statusCode, body } = await courseService.updateCourse(req.user.id, req.params.courseId, req.body);
            res.status(statusCode).json(body);
        } catch (err) {
            next(err);
        }
    },

};

module.exports = courseController;
