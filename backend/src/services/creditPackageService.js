const creditPackageRepository = require("../repositories/creditPackageRepository")
const creditPurchaseRepository = require("../repositories/creditPurchaseRepository")
const responseMessage = require("../utils/responseMessage")
const creditPackageValidator = require("../validators/creditPackageValidator");

const creditPackageService = {
  async getAllCreditPackages() {
    const result = await creditPackageRepository.selectAll()
    return responseMessage.success(result)
  },

  async createCreditPackage(data) {

    const { error, value } = creditPackageValidator.createSchema.validate(data);

    if (error) {
      throw responseMessage.error("欄位未填寫正確");
    }

    const creditPackage = await creditPackageRepository.selectOne({ name: value.name })
    if (creditPackage) {
        throw responseMessage.error("資料重複",409);
    }
    const result = await creditPackageRepository.insertOne(value)
    return responseMessage.success(result,201)
  },

  async purchaseCreditPackage(userId, creditPackageId) {

    const { error, value } = creditPackageValidator.purchaseSchema.validate({ user_id: userId, credit_package_id: creditPackageId })

    if (error) {
      throw responseMessage.error("ID錯誤");
    }

    const creditPackage = await creditPackageRepository.selectOne({ id: value.credit_package_id })
    if (!creditPackage) {
        throw responseMessage.error("ID錯誤");
    }

    await creditPurchaseRepository.insertOne({
      user: { id: value.user_id },
      creditPackage: { id: creditPackage.id },
      purchased_credits: creditPackage.credit_amount,
      price_paid: creditPackage.price,
    })

    return responseMessage.success(null)
  },

  async deleteSkill(creditPackageId) {

    const { error, value } = creditPackageValidator.idSchema.validate(creditPackageId)
    
    if (error) {
      throw responseMessage.error("ID錯誤");
    }

    const result = await creditPackageRepository.deleteOne(value);

    if(result.affected === 0){
        throw responseMessage.error("ID錯誤");
    }

    return responseMessage.success(value)
  },
};
module.exports = creditPackageService;