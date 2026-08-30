const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'CourseBooking',
  tableName: 'COURSE_BOOKING',
  columns: {
    id: { primary: true, type: 'uuid', generated: 'uuid', nullable: false },
    booking_at: { type: 'timestamp', createDate: true, nullable: false },
    cancelled_at: { type: 'timestamp', nullable: true },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'user_id' },
    },
    course: {
      target: 'Course',
      type: 'many-to-one',
      joinColumn: { name: 'course_id' },
    },
  },
})
