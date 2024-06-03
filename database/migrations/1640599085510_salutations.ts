import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contacts extends BaseSchema {
  protected tableName = 'salutations'

  public async up () {
    this.schema.alterTable('salutations', (table) => {
      table.boolean('is_org')
      table.boolean('is_hidden')
    })
  }

  public async down () {
    // this.schema.dropTable(this.tableName)
  }
}
