import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PaymentDeadline from 'App/Models/PaymentDeadline'

export default class PaymentDeadlineSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await PaymentDeadline.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'sofort',
        days: 7,
        is_immediately: true,
        is_default: true
      },
      {
        id: 2,
        name: '7 Tage',
        days: 7,
        is_immediately: false,
        is_default: false
      }
    ])
  }
}
