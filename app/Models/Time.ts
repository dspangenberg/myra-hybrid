import { BaseModel, BelongsTo, hasOne, HasOne, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'

import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'
import Project from 'App/Models/Project'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import TimeCategory from 'App/Models/TimeCategory'
import User from 'App/Models/User'
import { compose } from '@ioc:Adonis/Core/Helpers'

export default class Time extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public project_id: number

  @belongsTo(() => TimeCategory, {
    foreignKey: 'time_category_id'
  })
  public category: BelongsTo<typeof TimeCategory>

  @belongsTo(() => Project, {
    foreignKey: 'project_id',
    localKey: 'id'
  })
  public project: BelongsTo<typeof Project>

  @belongsTo(() => User, {
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @column()
  public user_id: number

  @column()
  public mins: number

  @column.date()
  public ts: DateTime

  @column()
  public time_category_id: number

  @column()
  public subproject_id: number

  @column()
  public task_id: number

  @column()
  public invoice_id: number

  @column()
  public minutes: number

  @column()
  public day: number

  @column.dateTime({
    serialize: (value: DateTime | null) => {
      return value ? value.setZone('Europe/Berlin').toFormat('dd.MM.yyyy HH:mm') : value
    },
    prepare: (value: string | null) => {
      return value ? DateTime.fromFormat(value, 'dd.MM.yyyy HH:mm').toFormat('yyyy-MM-dd HH:mm') : null
    }
  })
  public begin_at: DateTime

  @column.dateTime({
    serialize: (value: DateTime | null) => {
      return value ? value.setZone('Europe/Berlin').toFormat('dd.MM.yyyy HH:mm') : value
    },
    prepare: (value: string | null) => {
      return value ? DateTime.fromFormat(value, 'dd.MM.yyyy HH:mm').toFormat('yyyy-MM-dd HH:mm') : null
    }
  })
  public end_at: DateTime

  @column()
  public note: string

  @column()
  public is_locked: boolean

  @column()
  public is_billable: boolean

  @column()
  public is_timer: boolean

  @column.dateTime()
  public ping_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  public static whereWeek = scope((query, week = null, year = null) => {
    if (week && year) {
      query.whereRaw('WEEK(begin_at, 1) = ?', [week]).whereRaw('YEAR(begin_at)=?', [year])
    }
  })

  public static whereProject = scope((query, projectIds = null) => {
    console.log(projectIds)
    if (projectIds) {
      if (!Array.isArray(projectIds)) {
        projectIds = [projectIds]
      }
      query.whereIn('project_id', projectIds)
    }
  })

  public static whereStatus = scope((query, status) => {
    console.log(status)
    switch (status) {
      case 'open':
        query.where('invoice_id', 0) // .orWhere('invoice_id', 0)
        break
      case 'invoiced':
        query.whereNot('invoice_id', 0)
        break
      case 'notBillable':
        query.whereNot('is_billable', 1)
        break
      default:
        console.log('fsfsdfs')
    }
  })

  public static wherePeriod = scope((query, start, end) => {
    if (start && end) {
      // query.where('begin_at', '>=', start).debug(true)
      query.whereBetween('begin_at', [start, end]).orWhereBetween('end_at', [start, end])
    }
  })

  public static async getRunningTimers (userId) {
    const timers = Time.query()
      .preload('category')
      .preload('project', (query) => {
        query.preload('owner')
      })
      .preload('user')
      .whereNull('end_at')
      .where('user_id', userId)
      .orderBy('begin_at', 'desc')
    return timers
  }

  public static withMinutes = scope((query) => {
    query
      .select(Database.raw('TIMESTAMPDIFF(MINUTE, begin_at, end_at) as mins'))
      .select(Database.raw('DATE(begin_at) as ts'))
  })

  public static withMinutesSum = scope((query) => {
    query
      .select(Database.raw('sum(TIMESTAMPDIFF(MINUTE, begin_at, end_at)) as mins'))
  })
}
