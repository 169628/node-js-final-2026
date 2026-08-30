const { dataSource } = require("../../db/data-source");
const courseBookingRepo = dataSource.getRepository("CourseBooking");

const courseBookingRepository = {

  async selectOne(data) {
    const courseBooking = await courseBookingRepo.findOne({ where: data });
    return courseBooking;
  },

  async selectAll(data) {
    const courseBookings = await courseBookingRepo.find({
      where: data,
      relations: { course: { user: true } },
      order: { course: { start_at: "ASC" } },
    });
    return courseBookings;
  },

  async countAll(data) {
    const count = await courseBookingRepo.count({ where: data });
    return count;
  },

  async insertOne(data) {
    const courseBooking = await courseBookingRepo.save(data);
    return courseBooking;
  },

  async updateOne(courseBookingId, data) {
      const result = await courseBookingRepo.update(courseBookingId, data);
      return result;
  },
};

module.exports = courseBookingRepository;
