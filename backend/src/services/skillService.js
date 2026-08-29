const skillRepository = require("../repositories/skillRepository")
const responseMessage = require("../utils/responseMessage")
const skillValidator = require("../validators/skillValidator")

const skillService = {
  async getAllSkills() {
    const result = await skillRepository.selectAll()
    return responseMessage.success(result)
  },

  async createSkill(name) {

    const { error, value } = skillValidator.createSchema.validate(name);

    if (error) {
      throw responseMessage.error("欄位未填寫正確");
    }

    const skill = await skillRepository.selectOne(value)
    if (skill) {
        throw responseMessage.error("資料重複",409);
    }
    const result = await skillRepository.insertOne(value)
    return responseMessage.success(result,201)
  },

  async deleteSkill(skillId) {

    const { error, value } = skillValidator.idSchema.validate(skillId)
    
    if (error) {
      throw responseMessage.error("ID錯誤");
    }

    const result = await skillRepository.deleteOne(value);

    if(result.affected === 0){
        throw responseMessage.error("ID錯誤");
    }

    return responseMessage.success(value)
  },
};
module.exports = skillService;