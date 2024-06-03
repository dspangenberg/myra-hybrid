import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ProjectCategory from 'App/Models/ProjectCategory'

export default class ProjectCategorySeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'

    await ProjectCategory.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Administration',
        icon: 'tabler-icon-terminal-2'
      },
      {
        id: 2,
        name: 'Beratung/Schulung',
        icon: 'tabler-icon-school'
      },
      {
        id: 3,
        name: 'internes Projekt',
        icon: 'tabler-icon-smart-home'
      },
      {
        id: 4,
        name: 'Pflege',
        icon: 'tabler-icon-tools'
      },
      {
        id: 5,
        name: 'Support',
        icon: 'tabler-icon-tools'
      },
      {
        id: 6,
        name: 'Support (Endanwender)',
        icon: 'tabler-icon-tools'
      },
      {
        id: 7,
        name: 'Webentwicklung',
        icon: 'tabler-icon-brand-visual-studio'
      },
      {
        id: 8,
        name: 'Webdesign (Launch)',
        icon: 'tabler-icon-brand-html5'
      },
      {
        id: 9,
        name: 'Webdesign (Relaunch)',
        icon: 'tabler-icon-brand-html5'
      },
      {
        id: 10,
        name: 'Webhosting',
        icon: 'tabler-icon-server'
      }
    ])
  }
}
