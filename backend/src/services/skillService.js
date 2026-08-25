const skillRepository = require("../repositories/skillRepository")
const responseMessage = require("../utils/responseMessage")

const skillService = {
  async getAllSkills() {
    const result = await skillRepository.selectAll()
    return responseMessage.success(result)
  },

  async createSkill(name) {

    if (!name || typeof name !== "string" || name.trim() === "") {
      throw responseMessage.error("欄位未填寫正確");
    }

    const skill = await skillRepository.selectOne(name.trim())
    if (skill) {
        throw responseMessage.error("資料重複",409);
    }
    const result = await skillRepository.insertOne(name.trim())
    return responseMessage.success(result)
  },

  async deleteSkill(skillId) {

    if (!skillId || typeof skillId !== "string") {
      return responseMessage.error("ID錯誤")
    }

    const result = await skillRepository.deleteOne(skillId);

    if(result.affected === 0){
        throw responseMessage.error("ID錯誤");
    }

    return responseMessage.success(skillId)
  },
};
module.exports = skillService;