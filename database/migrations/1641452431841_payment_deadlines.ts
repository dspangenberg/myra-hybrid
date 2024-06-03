import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PaymentDeadlines extends BaseSchema {
  protected tableName = 'payment_deadlines'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.integer('days')

      table.boolean('is_immediately')
      table.boolean('is_default')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
