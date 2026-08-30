const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Coach',
  tableName: 'COACH',
  columns: {
    id: { primary: true, type: 'uuid', generated: 'uuid', nullable: false },
    experience_years: { type: 'integer', nullable: false },
    description:  { type: 'text', nullable: false },
    profile_image_url:  { type: 'text', nullable: true },
    created_at: { type: 'timestamp', createDate: true, nullable: false },
    updated_at: { type: 'timestamp', updateDate: true, nullable: false },
    skill_ids: { type: 'uuid', array: true, nullable: false, default:[] }
  },
  relations: {
    user: {
      target: 'User',                    
      type: 'one-to-one',               
      joinColumn: { name: 'user_id' },
    },
  },
})