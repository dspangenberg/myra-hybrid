import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Adresses extends BaseSchema {
  protected tableName = 'contact_addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('contact_id')

      table.text('address')
      table.string('zip', 6)
      table.string('city')
      table.integer('address_category_id')
      table.integer('country_id')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
