import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Country from 'App/Models/Country'

export default class SalutationSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await Country.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Deutschland',
        iso_code: 'DE',
        vehicle_code: 'D',
        country_code: '49'
      },
      {
        id: 2,
        name: 'Österreich',
        iso_code: 'AT',
        vehicle_code: 'A',
        country_code: '43'
      }
    ])
  }
}
