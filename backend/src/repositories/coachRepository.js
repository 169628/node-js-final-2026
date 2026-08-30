const { dataSource } = require("../../db/data-source");
const coachRepo = dataSource.getRepository("Coach");

const coachRepository = {

  async selectOne(data) {
    const coach = await coachRepo.findOneBy(data);
    return coach;
  },

  async insertOne(data) {
    const coach = await coachRepo.save(data);
    return coach;
  },

  async updateOne(coachId, data) {
      const result = await coachRepo.update(coachId, data);
      return result;
  },
};

module.exports = coachRepository;
