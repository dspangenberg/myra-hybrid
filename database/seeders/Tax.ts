import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tax from 'App/Models/Tax'

export default class TaxSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await Tax.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Standard',
        invoice_text: '',
        value: 19,
        needs_vat_id: false,
        is_default: true
      },
      {
        id: 2,
        name: 'Ermäßigt',
        invoice_text: '',
        value: 7,
        needs_vat_id: false,
        is_default: false
      },
      {
        id: 3,
        name: 'befreit',
        invoice_text: '',
        value: 0,
        needs_vat_id: false,
        is_default: false
      },
      {
        id: 4,
        name: '§ 3a Abs. 3 S. 1 UStG',
        // eslint-disable-next-line max-len
        invoice_text: 'Gemäß § 3a Abs. 3 S. 1 in Verbindung mit Abs. 4 Nr. 1, 2 UStG unterliegt die Leistung nicht der deutschen Umsatzsteuer.',
        value: 0,
        needs_vat_id: true,
        is_default: false
      }
    ])
  }
}
