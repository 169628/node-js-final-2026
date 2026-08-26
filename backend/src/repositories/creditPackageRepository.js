const { dataSource } = require("../../db/data-source");
const creditPackageRepo = dataSource.getRepository("CreditPackage");

const creditPackageRepository = {
  async selectAll() {
    const creditPackages = await creditPackageRepo.find({
      select: { id: true, name: true, credit_amount: true, price: true },
    });
    return creditPackages;
  },

  async selectOne(name) {
    const creditPackage = await creditPackageRepo.findOneBy({ name });
    return creditPackage;
  },

  async insertOne({ name, credit_amount, price }) {
    const creditPackage = await creditPackageRepo.save({ name, credit_amount, price });
    return creditPackage;
  },

  async deleteOne(creditPackageId) {
      const result = await creditPackageRepo.delete(creditPackageId);
      return result;
  },
};

module.exports = creditPackageRepository;
