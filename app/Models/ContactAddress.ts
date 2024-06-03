import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import AddressCategory from 'App/Models/AddressCategory'
import Contact from 'App/Models/Contact'
import Country from 'App/Models/Country'
import { DateTime } from 'luxon'

export default class ContactAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contact_id: number

  @column()
  public address: string

  @column()
  public zip: string

  @column()
  public city: string

  @column()
  public address_category_id: number

  @column()
  public country_id: number

  @belongsTo(() => Contact, {
    foreignKey: 'contact_id'
  })
  public contact: BelongsTo<typeof Contact>

  @belongsTo(() => AddressCategory, {
    foreignKey: 'address_category_id'
  })
  public category: BelongsTo<typeof AddressCategory>

  @belongsTo(() => Country, {
    foreignKey: 'country_id'
  })
  public country: BelongsTo<typeof Country>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
