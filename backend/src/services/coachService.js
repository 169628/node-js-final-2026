const { MoreThan } = require("typeorm");
const coachRepository = require("../repositories/coachRepository");
const skillRepository = require("../repositories/skillRepository");
const courseRepository = require("../repositories/courseRepository");
const responseMessage = require("../utils/responseMessage");
const coachValidator = require("../validators/coachValidator");

const coachService = {

    async getCoaches( query ) {

        const { error, value } = coachValidator.listSchema.validate(query);
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const { per, page } = value;
        const coaches = await coachRepository.selectAll({ skip: (page - 1) * per, limit: per });

        const result = coaches.map((i) => ({
            id: i.id,
            user_id: i.user?.id,
            name: i.user?.name,
        }));

        return responseMessage.success(result);

    },

    async getCoach( coachId ) {

        const { error, value } = coachValidator.idSchema.validate(coachId);
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const coach = await coachRepository.selectOne({ id: value });
        if (!coach) {
            throw responseMessage.error("找不到該教練");
        }

        const skills = await skillRepository.selectByIds(coach.skill_ids);

        return responseMessage.success({
            user: {
                name: coach.user.name,
                role: coach.user.role,
            },
            coach: {
                id: coach.id,
                user_id: coach.user.id,
                experience_years: coach.experience_years,
                description: coach.description,
                profile_image_url: coach.profile_image_url,
                created_at: coach.created_at,
                updated_at: coach.updated_at,
                skills: skills.map((skill) => skill.name),
            },
        });

    },

    async getCoachCourses( coachId ) {

        const { error, value } = coachValidator.idSchema.validate(coachId);
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const coach = await coachRepository.selectOne({ id: value });
        if (!coach) {
            throw responseMessage.error("找不到該教練");
        }

        const courses = await courseRepository.selectAll({ user: { id: coach.user.id }, end_at: MoreThan(new Date()) });

        const result = courses.map((course) => ({
            id: course.id,
            name: course.name,
            description: course.description,
            start_at: course.start_at,
            end_at: course.end_at,
            max_participants: course.max_participants,
            coach_name: coach.user.name,
            skill_name: course.skill?.name,
        }));

        return responseMessage.success(result);

    },

};
module.exports = coachService;
