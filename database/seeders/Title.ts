import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Title from 'App/Models/Title'

export default class TitleSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await Title.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Dr.',
        correspondence_salutation_male: 'r Herr Dr.',
        correspondence_salutation_female: 'Frau Dr.',
        correspondence_salutation_other: 'Dr.'
      },
      {
        id: 2,
        name: 'Prof. Dr. ',
        correspondence_salutation_male: 'r Herr Professor',
        correspondence_salutation_female: 'Frau Professorin',
        correspondence_salutation_other: 'Professor'
      }
    ])
  }
}
