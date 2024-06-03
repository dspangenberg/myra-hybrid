import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ContactsAddWebsites extends BaseSchema {
  protected tableName = 'contacts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('website')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('website')
    })
  }
}
