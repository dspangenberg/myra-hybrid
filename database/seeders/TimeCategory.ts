import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TimeCategory from 'App/Models/TimeCategory'

export default class TimeCategorySeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await TimeCategory.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Software- und Webentwicklung',
        short_name: 'DEV',
        hourly: 60
      },
      {
        id: 2,
        name: 'Administration',
        short_name: 'ADM',
        hourly: 60
      },
      {
        id: 3,
        name: 'Dokumentation',
        short_name: 'DOC',
        hourly: 60
      },
      {
        id: 4,
        name: 'Konzeption',
        short_name: 'KON',
        hourly: 60
      },
      {
        id: 5,
        name: 'Pflege',
        short_name: 'PFL',
        hourly: 60
      },
      {
        id: 6,
        name: 'Support',
        short_name: 'SUP',
        hourly: 60
      },
      {
        id: 7,
        name: 'Support (Endkunde)',
        short_name: 'SEU',
        hourly: 60
      },
      {
        id: 8,
        name: 'Abrechnung nach Aufwand (Allgemein)',
        short_name: 'GEN',
        hourly: 60,
        is_default: true
      }
    ])
  }
}
