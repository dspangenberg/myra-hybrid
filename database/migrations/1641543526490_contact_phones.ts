import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ContactPhones extends BaseSchema {
  protected tableName = 'contact_phones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('contact_id')
      table.integer('phone_category_id')
      table.integer('pos')

      table.string('phone')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
