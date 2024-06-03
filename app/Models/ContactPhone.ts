import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Contact from 'App/Models/Contact'
import { DateTime } from 'luxon'
import PhoneCategory from 'App/Models/PhoneCategory'

export default class ContactPhone extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contact_id: number

  @column()
  public pos: number

  @column()
  public phone_category_id: number

  @column()
  public phone: string

  @belongsTo(() => Contact, {
    foreignKey: 'contact_id'
  })
  public contact: BelongsTo<typeof Contact>

  @belongsTo(() => PhoneCategory, {
    foreignKey: 'phone_category_id'
  })
  public category: BelongsTo<typeof PhoneCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
