const bcrypt = require("bcryptjs");

const userRepository = require("../repositories/userRepository")
const coachRepository = require("../repositories/coachRepository")
const courseBookingRepository = require("../repositories/courseBookingRepository")
const creditPackageRepository = require("../repositories/creditPackageRepository")
const responseMessage = require("../utils/responseMessage")
const coachValidator = require("../validators/coachValidator");

const adminService = {

    async updateRole( userId, data ) {
    
        const { error, value } = coachValidator.createSchema.validate({ ...data, user_id: userId});
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const user = await userRepository.selectOne({ id: value.user_id })
        if (!user) {
            throw responseMessage.error("使用者不存在");
        }
        if(user.role === "COACH"){
            throw responseMessage.error("使用者已經是教練", 409);
        }

        const result = await userRepository.updateOne(user.id, {role: "COACH"});

        if(result.affected === 0){
            throw responseMessage.error("更新使用者資料失敗");
        }

        const { user_id, ...coachData } = value;
        const _result = await coachRepository.insertOne({ ...coachData, user: { id: user_id } })

        return responseMessage.success({
            user:{
                name: user.name,
                role: user.role
            },
            coach: _result
        },201)

    },

    async getProfile( userId ) {
    
        const { error, value } = coachValidator.idSchema.validate(userId);
        if (error) {
            throw responseMessage.error("ID錯誤");
        }

        const coach = await coachRepository.selectOne({ user:{ id: value } })
        if (!coach) {
            throw responseMessage.error("使用者尚未成為教練");
        }

        const { id, experience_years, description, profile_image_url, skill_ids } = coach

        return responseMessage.success({ id, experience_years, description, profile_image_url, skill_ids })

    },

    async updateProfile( userId, data ) {
    
        const { error, value } = coachValidator.updateSchema.validate({ ...data, user_id: userId});
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const coach = await coachRepository.selectOne({ user:{ id: value.user_id } })
        if (!coach) {
            throw responseMessage.error("使用者尚未成為教練");
        }

        const { user_id, ...coachData } = value;
        const result = await coachRepository.updateOne(coach.id, coachData)

        if(result.affected === 0){
            throw responseMessage.error("更新資料失敗");
        }

        return responseMessage.success({ ...coachData, id: coach.id })

    },

    async getRevenue( userId, data ) {

        const { error, value } = coachValidator.revenueSchema.validate({ ...data, user_id: userId});
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const year = new Date().getFullYear();
        const month = coachValidator.monthNames.indexOf(value.month) + 1;
        const bookings = await courseBookingRepository.selectMonthlyByCoach(value.user_id, year, month)

        const creditPackages = await creditPackageRepository.selectAll()
        const totalPrice = creditPackages.reduce((total, i) => total + Number(i.price), 0)
        const totalCredits = creditPackages.reduce((total, i) => total + Number(i.credit_amount), 0)
        const perCreditPrice = totalCredits > 0 ? totalPrice / totalCredits : 0

        return responseMessage.success({
            total: {
                revenue: Math.floor(bookings.length * perCreditPrice),
                participants: new Set(bookings.map((booking) => booking.user_id)).size,
                course_count: bookings.length,
            }
        })

    },

};
module.exports = adminService;