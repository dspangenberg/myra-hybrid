import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ContactMails extends BaseSchema {
  protected tableName = 'contact_emails'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('contact_id')
      table.integer('email_category_id')
      table.integer('pos')

      table.string('email')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
