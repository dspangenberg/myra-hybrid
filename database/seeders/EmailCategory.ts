import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import EmailCategory from 'App/Models/EmailCategory'

export default class PhoneCategorySeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await EmailCategory.updateOrCreateMany(uniqueKey, [
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
        name: 'primär',
        type: 0
      }
    ])
  }
}
