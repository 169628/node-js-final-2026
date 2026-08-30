const { dataSource } = require("../../db/data-source");
const userRepo = dataSource.getRepository("User");

const userRepository = {

  async selectOne(data) {
    const user = await userRepo.findOneBy(data);
    return user;
  },

  async insertOne(data) {
    const user = await userRepo.save(data);
    return user;
  },

  async updateOne(userId, data) {
      const result = await userRepo.update(userId, data);
      return result;
  },
};

module.exports = userRepository;
