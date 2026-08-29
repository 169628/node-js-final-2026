const { dataSource } = require("../../db/data-source");
const userPackageRepo = dataSource.getRepository("User");

const userPackageRepository = {

  async selectOne(data) {
    const user = await userPackageRepo.findOneBy(data);
    return user;
  },

  async insertOne({ name, email, password, role }) {
    const user = await userPackageRepo.save({ name, email, password, role });
    return user;
  },

  async updateOne(userId, data) {
      const result = await userPackageRepo.update(userId, data);
      return result;
  },
};

module.exports = userPackageRepository;
