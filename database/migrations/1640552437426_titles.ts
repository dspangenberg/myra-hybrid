import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Titles extends BaseSchema {
  protected tableName = 'titles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('correspondence_salutation_male')
      table.string('correspondence_salutation_female')
      table.string('correspondence_salutation_other')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
