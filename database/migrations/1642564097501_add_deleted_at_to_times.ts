import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddDeletedAts extends BaseSchema {
  protected tableName = 'times'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('website')
    })
  }
}
