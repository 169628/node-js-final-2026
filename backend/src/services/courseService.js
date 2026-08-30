const bcrypt = require("bcryptjs");
const { MoreThan, LessThanOrEqual } = require("typeorm");

const userRepository = require("../repositories/userRepository")
const courseRepository = require("../repositories/courseRepository")
const skillRepository = require("../repositories/skillRepository")
const responseMessage = require("../utils/responseMessage")
const courseValidator = require("../validators/courseValidator");

const courseService = {

    async createCourse( userId, data ) {
    
        const { error, value } = courseValidator.createSchema.validate({ ...data, user_id: userId});
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const user = await userRepository.selectOne({ id: value.user_id })
        if (!user) {
            throw responseMessage.error("使用者不存在");
        }

        const { user_id, skill_id, ...courseData } = value;
        const result = await courseRepository.insertOne({ ...courseData, user: { id: user_id }, skill: { id: skill_id } })

        return responseMessage.success({course: result})

    },

    async getCourses( userId ) {
    
        const { error, value } = courseValidator.idSchema.validate(userId);
        if (error) {
            throw responseMessage.error("ID錯誤");
        }

        const courses = await courseRepository.selectAll({ user:{ id: value } })

        courses.map((i)=>{
            const today = new Date()
            if (today < i.start_at){
                i.status = "尚未開始"
            } else if (today <= i.end_at){
                i.status = "進行中"
            } else { 
                i.status = "已結束"
            }
            // 還沒有寫到報名與取消，先暫寫一個值
            i.participants = 0
            return i
        })

        return responseMessage.success(courses)

    },

    async getCourse( userId, courseId ) {
    
        const { error, value } = courseValidator.getCourseSchema.validate({user_id: userId, course_id: courseId});
        if (error) {
            throw responseMessage.error("ID錯誤");
        }

        const course = await courseRepository.selectOne({id: value.course_id, user:{ id: value.user_id } })
        if (!course){
            throw responseMessage.error("課程不存在");
        }
        const { skill, ...courseData } = course;

        return responseMessage.success({ ...courseData, skill_id: skill?.id, skill_name: skill?.name });
    },

    async getOpeningCourses() {

        const now = new Date();
        const courses = await courseRepository.selectAll({ start_at: LessThanOrEqual(now), end_at: MoreThan(now) });

        const result = courses.map((course) => ({
            id: course.id,
            name: course.name,
            description: course.description,
            start_at: course.start_at,
            end_at: course.end_at,
            max_participants: course.max_participants,
            coach_name: course.user?.name,
            skill_name: course.skill?.name,
        }));

        return responseMessage.success(result);

    },

    async updateCourse( userId, courseId, data ) {
    
        const { error, value } = courseValidator.updateCourseSchema.validate({ ...data, user_id: userId, course_id: courseId});
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const course = await courseRepository.selectOne({id: value.course_id, user:{ id: value.user_id } })
        if (!course){
            throw responseMessage.error("課程不存在");
        }

        const { user_id, skill_id, course_id, ...courseData } = value;
        courseData.skill = { id: skill_id }
        const result = await courseRepository.updateOne(course.id, courseData)

        if(result.affected === 0){
            throw responseMessage.error("更新資料失敗");
        }

        const _course = await courseRepository.selectOne({id: course.id })
        const { skill, ...restCourse } = _course;
        return responseMessage.success({course: { ...restCourse, skill_id: skill?.id }})


    },

};
module.exports = courseService;