import AddressCategory from 'App/Models/AddressCategory'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class AddressCategorySeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await AddressCategory.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Rechnungsanschrift',
        type: 9
      },
      {
        id: 2,
        name: 'Lieferanschrift',
        type: 0
      },
      {
        id: 3,
        name: 'Hausanschrift',
        type: 0
      },
      {
        id: 4,
        name: 'Postanschrift',
        type: 0
      },
      {
        id: 5,
        name: 'Privatanschrift',
        type: 0
      },
      {
        id: 6,
        name: 'Praxis',
        type: 0
      },
      {
        id: 7,
        name: 'Arbeit',
        type: 0
      }
    ])
  }
}
