import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PhoneCategory from 'App/Models/PhoneCategory'

export default class PhoneCategorySeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await PhoneCategory.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'privat',
        type: 0
      },
      {
        id: 2,
        name: 'Arbeit',
        type: 0
      },
      {
        id: 3,
        name: 'Zentrale',
        type: 0
      },
      {
        id: 4,
        name: 'Mobil',
        type: 0
      },
      {
        id: 5,
        name: 'Vorzimmer',
        type: 0
      },
      {
        id: 6,
        name: 'Mobil (privat)',
        type: 0
      },
      {
        id: 7,
        name: 'Mobil (Arbeit)',
        type: 0
      },
      {
        id: 8,
        name: 'Fax (Zentrale)',
        type: 0
      },
      {
        id: 9,
        name: 'Fax (privat)',
        type: 0
      },
      {
        id: 10,
        name: 'Fax (Arbeit)',
        type: 0
      },
      {
        id: 11,
        name: 'Festnetz',
        type: 0
      }
    ])
  }
}
