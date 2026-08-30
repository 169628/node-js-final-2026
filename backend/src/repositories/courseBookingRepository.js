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

  // 原生 SQL
  async selectMonthlyByCoach(coachUserId, year, month) {
    const courseBookings = await dataSource.query(
      `SELECT cb.user_id FROM "COURSE_BOOKING" cb
       JOIN "COURSE" c ON c.id = cb.course_id
       WHERE c.user_id = $1 AND cb.cancelled_at IS NULL
         AND EXTRACT(YEAR FROM cb.booking_at) = $2
         AND EXTRACT(MONTH FROM cb.booking_at) = $3`,
      [coachUserId, year, month],
    );
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
