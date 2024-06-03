import {
  AttachmentContract,
  attachment
} from '@ioc:Adonis/Addons/AttachmentLite'
import { BaseModel, BelongsTo, BelongsToMany, HasMany, belongsTo, belongsToMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Contact from 'App/Models/Contact'
import { DateTime } from 'luxon'
import ProjectCategory from 'App/Models/ProjectCategory'
import Time from 'App/Models/Time'
import User from 'App/Models/User'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public website: string

  @column()
  public note: string

  @column()
  public project_category_id: number

  @column()
  public parent_project_id: number

  @column()
  public owner_contact_id: number

  @column()
  public lead_user_id: number

  @column()
  public manager_contact_id: number

  @column()
  public invoice_contact_id: number

  @column()
  public budget_hours: number

  @column()
  public budget_costs: number

  @column()
  public hourly: number

  @column()
  public budget_period: string

  @column.date()
  public begin_on: DateTime

  @column.date()
  public end_on: DateTime

  @attachment()
  public avatar: AttachmentContract

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ProjectCategory, {
    foreignKey: 'project_category_id'
  })
  public category: BelongsTo<typeof ProjectCategory>

  @belongsTo(() => Contact, {
    foreignKey: 'owner_contact_id'
  })
  public owner: BelongsTo<typeof Contact>

  @belongsTo(() => Contact, {
    foreignKey: 'manager_contact_id'
  })
  public manager: BelongsTo<typeof Contact>

  @belongsTo(() => Project, {
    foreignKey: 'parent_project_id'
  })
  public parent: BelongsTo<typeof Project>

  // eslint-disable-next-line no-use-before-define

  public static async idsbyContact (contactId) {
    const projects = Project.query().where('owner_contact_id', contactId)
    return (await projects).map(item => item.id)
  }

  @belongsTo(() => User, {
    foreignKey: 'lead_user_id'
  })
  public leader: BelongsTo<typeof User>

  @hasMany(() => Time, {
    foreignKey: 'project_id',
    localKey: 'id'
  })
  public times: HasMany<typeof Time>
}
