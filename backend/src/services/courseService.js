const bcrypt = require("bcryptjs");
const { MoreThan, LessThanOrEqual, IsNull } = require("typeorm");

const userRepository = require("../repositories/userRepository")
const courseRepository = require("../repositories/courseRepository")
const skillRepository = require("../repositories/skillRepository")
const courseBookingRepository = require("../repositories/courseBookingRepository")
const creditPurchaseRepository = require("../repositories/creditPurchaseRepository")
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

        const now = new Date()
        for (const course of courses) {
            if (now < course.start_at){
                course.status = "尚未開始"
            } else if (now <= course.end_at){
                course.status = "進行中"
            } else {
                course.status = "已結束"
            }
            // 報名人數只算沒取消的
            course.participants = await courseBookingRepository.countAll({ course: { id: course.id }, cancelled_at: IsNull() })
        }

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

    async createBooking( userId, courseId ) {

        const { error, value } = courseValidator.bookingSchema.validate({ user_id: userId, course_id: courseId });
        if (error) {
            throw responseMessage.error("ID錯誤");
        }

        // ① 查無課程
        const course = await courseRepository.selectOne({ id: value.course_id })
        if (!course){
            throw responseMessage.error("ID錯誤");
        }

        // ② 已報名（含已取消）
        const booking = await courseBookingRepository.selectOne({ user: { id: value.user_id }, course: { id: value.course_id } })
        if (booking){
            throw responseMessage.error("已經報名過此課程");
        }

        // ③ 剩餘堂數
        const creditPurchases = await creditPurchaseRepository.selectAll({ user: { id: value.user_id } })
        const creditTotal = creditPurchases.reduce((total, i) => total + i.purchased_credits, 0)
        const creditUsage = await courseBookingRepository.countAll({ user: { id: value.user_id }, cancelled_at: IsNull() })
        if (creditTotal - creditUsage <= 0){
            throw responseMessage.error("已無可使用堂數");
        }

        // ④ 最大人數
        const participants = await courseBookingRepository.countAll({ course: { id: value.course_id }, cancelled_at: IsNull() })
        if (participants >= course.max_participants){
            throw responseMessage.error("已達最大參加人數，無法參加");
        }

        await courseBookingRepository.insertOne({ user: { id: value.user_id }, course: { id: value.course_id } })

        return responseMessage.success(null, 201)

    },

    async deleteBooking( userId, courseId ) {

        const { error, value } = courseValidator.bookingSchema.validate({ user_id: userId, course_id: courseId });
        if (error) {
            throw responseMessage.error("ID錯誤");
        }

        const booking = await courseBookingRepository.selectOne({
            user: { id: value.user_id },
            course: { id: value.course_id },
            cancelled_at: IsNull(),
        })
        if (!booking){
            throw responseMessage.error("ID錯誤");
        }

        const result = await courseBookingRepository.updateOne(booking.id, { cancelled_at: new Date() })

        if(result.affected === 0){
            throw responseMessage.error("取消失敗");
        }

        return responseMessage.success(null)

    },

};
module.exports = courseService;