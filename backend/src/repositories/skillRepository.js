const { dataSource } = require("../../db/data-source");
const skillRepo = dataSource.getRepository("Skill");

const skillRepository = {
  async selectAll() {
    const skills = await skillRepo.find({
      select: { id: true, name: true },
      order: { created_at: "ASC" },
    });
    return skills;
  },

  async selectOne(name) {
    const skill = await skillRepo.findOneBy({ name });
    return skill;
  },

  async insertOne(name) {
    const skill = await skillRepo.save({ name });
    return skill;
  },

  async deleteOne(skillId) {
      const result = await skillRepo.delete(skillId);
      return result;
  },
};

module.exports = skillRepository;
