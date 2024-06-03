import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contacts extends BaseSchema {
  protected tableName = 'contacts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('company_id')
      table.boolean('is_org')

      table.string('name')
      table.integer('title_id')
      table.integer('salutation_id')
      table.string('first_name')
      table.string('position')
      table.string('department')

      table.string('short_name')
      table.string('ref')

      table.integer('catgory_id')

      table.boolean('is_debtor')
      table.boolean('is_creditor')
      table.integer('debtor_number')
      table.integer('creditor_number')

      table.boolean('is_archived')
      table.string('archived_reason')

      table.boolean('has_dunning_block')
      table.integer('payment_deadline_id')
      table.integer('tax_id')
      table.decimal('hourly')
      table.string('register_court')
      table.string('register_number')
      table.string('vat_id')

      table.text('note')
      table.date('dob')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
