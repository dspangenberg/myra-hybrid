import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Contact from 'App/Models/Contact'
import { DateTime } from 'luxon'
import EmailCategory from 'App/Models/EmailCategory'

export default class ContactEmail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contact_id: number

  @column()
  public email_category_id: number

  @column()
  public pos: number

  @column()
  public email: string

  @belongsTo(() => Contact, {
    foreignKey: 'contact_id'
  })
  public contact: BelongsTo<typeof Contact>

  @belongsTo(() => EmailCategory, {
    foreignKey: 'email_category_id'
  })
  public category: BelongsTo<typeof EmailCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
