import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Projects extends BaseSchema {
  protected tableName = 'projects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.string('name')
      table.integer('owner_contact_id')
      table.integer('lead_user_id')
      table.integer('manager_contact_id')
      table.integer('invoice_contact_id')
      table.integer('project_category_id')
      table.integer('parent_project_id')
      table.boolean('is_archived').defaultTo(false)
      table.date('begin_on').nullable()
      table.date('end_on').nullable()
      table.string('website')
      table.text('note')
      table.json('avatar').nullable()

      table.decimal('hourly')
      table.decimal('budget_hours')
      table.decimal('budget_costs')
      table.string('budget_period', 1)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

/*
  name: String,
  contact$: String,
  invoiceName: String,
  isArchived: Boolean,
  projectCategory$: String,
  accountId: Number,
  projectCategory: ProjectCategory,
  parentProject$: String,
  parentProject: this,
  hourly: Number,
  contact: Contact,
*/
