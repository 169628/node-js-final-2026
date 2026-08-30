const { dataSource } = require("../../db/data-source");
const courseRepo = dataSource.getRepository("Course");

const courseRepository = {

  async selectOne(data) {
    const course = await courseRepo.findOne({ where: data, relations: { skill: true } });
    return course;
  },

  async selectAll(data) {
    const courses = await courseRepo.findBy(data);
    return courses;
  },

  async insertOne(data) {
    const course = await courseRepo.save(data);
    return course;
  },

  async updateOne(courseId, data) {
      const result = await courseRepo.update(courseId, data);
      return result;
  },
};

module.exports = courseRepository;
