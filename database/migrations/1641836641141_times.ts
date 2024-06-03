import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Times extends BaseSchema {
  protected tableName = 'times'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('project_id')
      table.integer('time_category_id')

      table.integer('subproject_id')
      table.integer('task_id')
      table.integer('user_id')
      table.integer('invoice_id')

      table.text('note')

      table.timestamp('begin_at').nullable()
      table.timestamp('end_at').nullable()

      table.boolean('is_locked').defaultTo(false)
      table.boolean('is_billable').defaultTo(true)
      table.boolean('is_timer').defaultTo(false)

      table.integer('minutes')

      table.timestamp('ping_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
