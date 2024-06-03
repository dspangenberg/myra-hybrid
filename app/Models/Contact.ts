import { BaseModel, BelongsTo, HasMany, belongsTo, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Address from 'App/Models/ContactAddress'
import { DateTime } from 'luxon'
import Email from 'App/Models/ContactEmail'
import Phone from 'App/Models/ContactPhone'
import Project from 'App/Models/Project'
import Salutation from 'App/Models/Salutation'
import Title from 'App/Models/Title'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company_id: number

  @belongsTo(() => Contact, {
    foreignKey: 'company_id'
  })
  public company: BelongsTo<typeof Contact>

  @belongsTo(() => Title, {
    foreignKey: 'title_id'
  })
  public title: BelongsTo<typeof Title>

  @belongsTo(() => Salutation, {
    foreignKey: 'salutation_id'
  })
  public salutation: BelongsTo<typeof Salutation>

  @hasMany(() => Address, {
    foreignKey: 'contact_id'
  })
  public addresses: HasMany<typeof Address>

  @hasMany(() => Project, {
    foreignKey: 'owner_contact_id',
    localKey: 'id'
  })
  public projects: HasMany<typeof Project>

  @hasMany(() => Phone, {
    foreignKey: 'contact_id'
  })
  public phones: HasMany<typeof Phone>

  @hasMany(() => Email, {
    foreignKey: 'contact_id'
  })
  public emails: HasMany<typeof Email>

  @hasMany(() => Contact, {
    foreignKey: 'company_id',
    localKey: 'id'
  })
  public contacts: HasMany<typeof Contact>

  @column()
  public is_org: boolean

  @column()
  public catgory_id: number

  @column()
  public name: string

  @column()
  public title_id: number

  @column()
  public salutation_id: number

  @column()
  public first_name: string

  @column()
  public website: string

  @column()
  public position: string

  @column()
  public department: string

  @column()
  public short_name: string

  @column()
  public ref: string

  @column()
  public is_creditor: boolean

  @column()
  public is_debtor: boolean

  @column()
  public debtor_number: number

  @column()
  public creditor_number: number

  @column()
  public is_archived: boolean

  @column()
  public archived_reason: string

  @column()
  public has_dunning_block: boolean

  @column()
  public payment_deadline_id: number

  @column()
  public tax_id: number

  @column()
  public hourly: number

  @column()
  public register_court: number

  @column()
  public register_number: number

  @column()
  public vat_id: number

  @column()
  public dob: Date

  @column()
  public note: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime

  @computed()
  public get fullName () {
    const title = this.title_id && this.title ? this.title.name : ''
    const parts = [title, this.first_name, this.name].filter(item => !!item)
    return parts.join(' ')
  }

  @computed()
  public get fullNameR () {
    const title = this.title_id && this.title ? this.title.name : ''
    const firstName = [this.first_name, title].filter(item => !!item).join(' ')
    return this.first_name ? this.name + ', ' + firstName : this.name
  }

  @computed()
  public get initials () {
    return [this.first_name, this.name].filter(item => !!item).map(item => item.substr(0, 1)).join('').toUpperCase()
  }
}
