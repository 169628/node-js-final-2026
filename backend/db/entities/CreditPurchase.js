const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'CreditPurchase',
  tableName: 'CREDIT_PURCHASE',
  columns: {
    id: { primary: true, type: 'uuid', generated: 'uuid', nullable: false },
    purchased_credits: { type: 'integer', nullable: false },
    price_paid: { type: 'integer', nullable: false },
    purchase_at: { type: 'timestamp', createDate: true, nullable: false },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',              
      joinColumn: { name: 'user_id' },
    },
    creditPackage: {
      target: 'CreditPackage',
      type: 'many-to-one',               
      joinColumn: { name: 'credit_package_id' },
    },
  },
})
