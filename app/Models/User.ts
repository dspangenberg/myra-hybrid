import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public salutation_id: number

  @column()
  public name: string

  @column()
  public first_name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public uid: number

  @column()
  public aid: number

  @column()
  public is_admin: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime

  @computed()
  public get fullName () {
    const parts = [this.first_name, this.name].filter(item => !!item)
    return parts.join(' ')
  }

  @computed()
  public get fullNameR () {
    const firstName = [this.first_name].filter(item => !!item).join(' ')
    return this.first_name ? this.name + ', ' + firstName : this.name
  }

  @computed()
  public get initials () {
    return [this.first_name, this.name].filter(item => !!item).map(item => item.substring(0, 1)).join('').toUpperCase()
  }
}
