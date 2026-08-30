const { dataSource } = require("../../db/data-source");
const creditPurchaseRepo = dataSource.getRepository("CreditPurchase");

const creditPurchaseRepository = {

  async selectAll(data) {
    const creditPurchases = await creditPurchaseRepo.find({
      where: data,
      relations: { creditPackage: true },
      order: { purchase_at: "DESC" },
    });
    return creditPurchases;
  },

  async insertOne(data) {
    const creditPurchase = await creditPurchaseRepo.save(data);
    return creditPurchase;
  },
};

module.exports = creditPurchaseRepository;
