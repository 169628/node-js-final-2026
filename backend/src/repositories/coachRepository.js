const { dataSource } = require("../../db/data-source");
const coachRepo = dataSource.getRepository("Coach");

const coachRepository = {

  async selectOne(data) {
    const coach = await coachRepo.findOne({ where: data, relations: { user: true } });
    return coach;
  },

  async selectAll({ skip, limit }) {
    const coaches = await coachRepo.find({
      relations: { user: true },
      skip,
      take: limit,
    });
    return coaches;
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
