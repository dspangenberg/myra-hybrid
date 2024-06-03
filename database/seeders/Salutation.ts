import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Salutation from 'App/Models/Salutation'

export default class SalutationSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await Salutation.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Herr',
        gender: 'm',
        is_org: false,
        is_hidden: false
      },
      {
        id: 2,
        name: 'Frau',
        gender: 'f',
        is_org: false,
        is_hidden: false
      },
      {
        id: 3,
        name: 'Divers',
        gender: 'x',
        is_org: false,
        is_hidden: true
      },
      {
        id: 4,
        name: 'Firma',
        gender: '',
        is_org: true,
        is_hidden: true
      }
    ])
  }
}
