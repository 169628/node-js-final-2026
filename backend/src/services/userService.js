const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository")
const creditPurchaseRepository = require("../repositories/creditPurchaseRepository")
const courseBookingRepository = require("../repositories/courseBookingRepository")
const responseMessage = require("../utils/responseMessage")
const userValidator = require("../validators/userValidator");
const config = require("../config/index");
const { password } = require("../config/db");

const { jwtSecret, jwtExpiresDay } = config.secret

const userService = {

    async signup(data) {

        const { error, value } = userValidator.createSchema.validate(data);

        if (error) {
        throw responseMessage.error("欄位未填寫正確");
        }

        const user = await userRepository.selectOne({ email: value.email })
        if (user) {
            throw responseMessage.error("Email 已被使用",409);
        }

        const { name, email } = value
        const hashed = await bcrypt.hash(value.password, 10);
        const userData = {
            name,
            email,
            password: hashed,
            role: "USER"
        }

        const result = await userRepository.insertOne(userData)
        return responseMessage.success({ 
            user: {
                name: result.name , 
                id: result.id 
            } },201)
    },

    async getProfile(userId) {
    
        const { error, value } = userValidator.idSchema.validate(userId);

        if (error) {
        throw responseMessage.error("ID錯誤");
        }

        const user = await userRepository.selectOne({ id: value })
        if (!user) {
            throw responseMessage.error("無效的 token", 401);
        }

        const { name, email } = user

        return responseMessage.success({ user:{ name, email } })

    },

    async updateName(id, name) {
    
        const { error, value } = userValidator.updateNameSchema.validate({id, name});
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const user = await userRepository.selectOne({ id: value.id })
        if (!user) {
            throw responseMessage.error("無效的 token", 401);
        }

        if(user.name === value.name){
            throw responseMessage.error("使用者名稱未變更");
        }

        const result = await userRepository.updateOne(value.id, {name: value.name});

        if(result.affected === 0){
            throw responseMessage.error("更新使用者資料失敗");
        }

        return responseMessage.success({ user:{ name: value.name } })

    },

    async updatePassword(id, data) {
    
        const { error, value } = userValidator.updatePasswordSchema.validate({ ...data, id });
        if (error) {
            throw responseMessage.error("欄位未填寫正確");
        }

        const user = await userRepository.selectOne({ id: value.id })
        if (!user) {
            throw responseMessage.error("無效的 token", 401);
        }

        const match = await bcrypt.compare(value.password, user.password);
        if (!match) {
            throw responseMessage.error("密碼輸入錯誤");
        }

        const _match = await bcrypt.compare(value.new_password, user.password);
        if (_match) {
            throw responseMessage.error("新密碼不能與舊密碼相同");
        }

        if(value.new_password !== value.confirm_new_password){
            throw responseMessage.error("新密碼與驗證新密碼不一致");
        }

        const hashed = await bcrypt.hash(value.new_password, 10);
        const result = await userRepository.updateOne(value.id, {password: hashed});

        if(result.affected === 0){
            throw responseMessage.error("更新使用者資料失敗");
        }

        return responseMessage.success(null)

    },

    async login(data) {
        
        const { error, value } = userValidator.loginSchema.validate(data);

        if (error) {
        throw responseMessage.error("欄位未填寫正確");
        }

        const user = await userRepository.selectOne({ email: value.email })
        if (!user) {
            throw responseMessage.error("使用者不存在或密碼輸入錯誤");
        }

        const match = await bcrypt.compare(value.password, user.password);
        if (!match) {
            throw responseMessage.error("使用者不存在或密碼輸入錯誤");
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            jwtSecret,
            { expiresIn: jwtExpiresDay },
        );

        return responseMessage.success({ token, user: { name: user.name } },201)

    },

    async getCreditPurchases(userId) {

        const { error, value } = userValidator.idSchema.validate(userId);

        if (error) {
        throw responseMessage.error("ID錯誤");
        }

        const creditPurchases = await creditPurchaseRepository.selectAll({ user: { id: value } })

        const result = creditPurchases.map((i) => ({
            name: i.creditPackage?.name,
            purchased_credits: i.purchased_credits,
            price_paid: i.price_paid,
            purchase_at: i.purchase_at,
        }))

        return responseMessage.success(result)

    },

    async getCourseBookings(userId) {

        const { error, value } = userValidator.idSchema.validate(userId);

        if (error) {
        throw responseMessage.error("ID錯誤");
        }

        const creditPurchases = await creditPurchaseRepository.selectAll({ user: { id: value } })
        const creditTotal = creditPurchases.reduce((total, i) => total + i.purchased_credits, 0)

        const courseBookings = await courseBookingRepository.selectAll({ user: { id: value } })
        const creditUsage = courseBookings.filter((i) => !i.cancelled_at).length

        const result = courseBookings.map((i) => ({
            course_id: i.course?.id,
            name: i.course?.name,
            start_at: i.course?.start_at,
            end_at: i.course?.end_at,
            meeting_url: i.course?.meeting_url,
            coach_name: i.course?.user?.name,
            cancelled_at: i.cancelled_at,
        }))

        return responseMessage.success({
            credit_remain: creditTotal - creditUsage,
            credit_usage: creditUsage,
            course_booking: result,
        })

    },

};
module.exports = userService;