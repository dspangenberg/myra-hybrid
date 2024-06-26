import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'

export default class TimeCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public short_name: string

  @column()
  public hourly: number

  @column()
  public pos: number

  @column()
  public is_default: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
