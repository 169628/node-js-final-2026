const creditPackageRepository = require("../repositories/creditPackageRepository")
const responseMessage = require("../utils/responseMessage")

const creditPackageService = {
  async getAllCreditPackages() {
    const result = await creditPackageRepository.selectAll()
    return responseMessage.success(result)
  },

  async createCreditPackage({ name, credit_amount, price }) {

    if (!name || typeof name !== "string" || name.trim() === "") {
      throw responseMessage.error("欄位未填寫正確");
    }
    if (!credit_amount || typeof credit_amount !== "number" ) {
      throw responseMessage.error("欄位未填寫正確");
    }
    if (!price || typeof price !== "number" ) {
      throw responseMessage.error("欄位未填寫正確");
    }

    const creditPackage = await creditPackageRepository.selectOne(name.trim())
    if (creditPackage) {
        throw responseMessage.error("資料重複",409);
    }
    const result = await creditPackageRepository.insertOne({ name: name.trim(), credit_amount, price })
    return responseMessage.success(result,201)
  },

  async deleteSkill(creditPackageId) {

    if (!creditPackageId || typeof creditPackageId !== "string") {
      return responseMessage.error("ID錯誤")
    }

    const result = await creditPackageRepository.deleteOne(creditPackageId);

    if(result.affected === 0){
        throw responseMessage.error("ID錯誤");
    }

    return responseMessage.success(creditPackageId)
  },
};
module.exports = creditPackageService;