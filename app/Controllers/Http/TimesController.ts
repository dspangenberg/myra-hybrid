import { groupBy, max, min, sumBy, uniq } from 'lodash'

import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PdfService from 'App/Services/PdfService'
import Project from 'App/Models/Project'
import Time from 'App/Models/Time'
import TimeCategory from 'App/Models/TimeCategory'
import TimesVal from 'App/Validators/TimeValidator'
import User from 'App/Models/User'
import Contact from 'App/Models/Contact'
import weasyprint from 'weasyprint-wrapper'

weasyprint.command = '/opt/homebrew/bin/weasyprint'

export default class TimesController {
  public async index ({ inertia, request, params }: HttpContextContract) {
    const projects = await Project.query().where('is_archived', 0).orderBy('name')
    const timeCategories = await TimeCategory.query().orderBy('is_default', 'desc').orderBy('name')
    const users = await User.query().orderBy('name').orderBy('first_name')
    const now = DateTime.now()

    const accountsWithTimes = await Time.query()
      .preload('project', query => query.preload('owner'))
      .distinct('project_id')
    const accountIds = accountsWithTimes.map(item => item.project?.owner_contact_id || 0)

    const accounts = await Contact.query()
      .whereIn('id', accountIds)
      .orderBy(['name', 'first_name'])

    console.log(request.all())

    const year = request.input('year', now.year)
    const weekNumber = request.input('week', now.weekNumber)
    const accountId = request.input('contact_id', 0)
    const status = request.input('status', '')
    const beginAt = request.input('beginAt', '')
    const endAt = request.input('endAt', '')

    let projectId = request.input('project_id', 0)

    const filters = {
      contact_id: accountId,
      project_id: projectId,
      status: status,
      beginAt: beginAt,
      endAt: endAt
    }

    if (accountId && !projectId) {
      projectId = await Project.idsbyContact(accountId)
    }

    const startDate = DateTime.fromObject({
      weekYear: year,
      weekNumber: weekNumber
    }).startOf('week')

    let filterBegin = startDate.startOf('week').toFormat('yyyy-MM-dd HH:mm:ss')
    let filterEnd = startDate.endOf('week').toFormat('yyyy-MM-dd HH:mm:ss')

    if (projectId || accountId) {
      filterBegin = startDate.startOf('year').toFormat('yyyy-MM-dd HH:mm:ss')
      filterEnd = startDate.endOf('year').toFormat('yyyy-MM-dd HH:mm:ss')
    }

    if (beginAt) {
      filterBegin = DateTime.fromFormat(beginAt, 'dd.MM.yyyy').toFormat('yyyy-MM-dd 00:00:00')
    }

    if (endAt) {
      filterEnd = DateTime.fromFormat(endAt, 'dd.MM.yyyy').toFormat('yyyy-MM-dd 23:59:59')
    }

    console.log(filterBegin, filterEnd, projectId, accountId)

    const times = await Time.query()
      .select('*')
      .debug(true)
      .withScopes((scopes) => scopes.withMinutes())
      .withScopes((scopes) => scopes.whereWeek(weekNumber, year))
      .withScopes((scopes) => scopes.wherePeriod(filterBegin, filterEnd))
      .withScopes((scopes) => scopes.whereStatus(status))
      .withScopes((scopes) => scopes.whereProject(projectId))
      .preload('project')
      .preload('category')
      .preload('user')
      .orderBy('begin_at', 'desc')

    const weekdaysTime = await Time.query()
      .withScopes((scopes) => scopes.withMinutesSum())
      .withScopes((scopes) => scopes.whereWeek(weekNumber, year))
      .select(Database.raw('WEEKDAY(begin_at) as day'))
      .groupByRaw('WEEKDAY(begin_at)')

    const groupedTimes = groupBy(times, 'ts')

    const openTimesRows = await Time.query()
      .groupBy('project_id')
      .withScopes((scopes) => scopes.withMinutesSum())
      .select('project_id')
      .whereNull('invoice_id')
      .preload('project', (query) => {
        query.preload('owner')
      })
    const openTimes = openTimesRows.map(item => {
      const record = {
        project_id: item.id,
        project_name: item.project?.name,
        hourly: item.project?.hourly ? item.project?.hourly : item.project?.owner?.hourly,
        minutes: item.mins,
        costs: 0
      }

      record.costs = Math.ceil(record.minutes / 15) * record.hourly / 4

      return record
    })

    return inertia.render('App/Times', {
      filters,
      projects,
      timeCategories,
      times,
      users,
      groupedTimes,
      openTimes,
      weekdaysTime,
      startDate,
      accounts
    })
  }

  public async duplicate ({ inertia, params }: HttpContextContract) {
    let time
    if (params.id) {
      time = await Time.query().where('id', params.id).first()
      time.note = 'Ungespeichertes Duplikat' + time.note
      time.id = null
    }
    return inertia.render('App/Times/TimesEdit', {
      time
    })
  }

  public async edit ({ inertia, params }: HttpContextContract) {
    let time
    if (params.id) {
      time = await Time.query().where('id', params.id).first()
    } else {
      time = time = await Time.query().orderBy('id', 'desc').first()
      time.note = ''
      time.begin_at = DateTime.now()
      time.end_at = null
      time.id = null
    }

    const projects = await Project.query().where('is_archived', 0).orderBy('name')
    const timeCategories = await TimeCategory.query().orderBy('is_default', 'desc').orderBy('name')
    const users = await User.query().orderBy('name').orderBy('first_name')

    return inertia.render('App/Times/TimesEdit', {
      projects, timeCategories, users, time
    })
  }

  public async printWeek ({ response, request, params, view }: HttpContextContract) {
    const projects = await Project.query().where('is_archived', 0).orderBy('name')
    const timeCategories = await TimeCategory.query().orderBy('is_default', 'desc').orderBy('name')
    const users = await User.query().orderBy('name').orderBy('first_name')
    const now = DateTime.now()

    const accountsWithTimes = await Time.query()
      .preload('project', query => query.preload('owner'))
      .distinct('project_id')
    const accountIds = accountsWithTimes.map(item => item.project?.owner_contact_id || 0)

    const accounts = await Contact.query()
      .whereIn('id', accountIds)
      .orderBy(['name', 'first_name'])

    console.log(request.all())

    const year = request.input('year', now.year)
    const weekNumber = request.input('week', now.weekNumber)
    const accountId = request.input('contact_id', 0)
    const status = request.input('status', '')
    const beginAt = request.input('beginAt', '')
    const endAt = request.input('endAt', '')

    let projectId = request.input('project_id', 0)

    const filters = {
      contact_id: accountId,
      project_id: projectId,
      status: status,
      beginAt: beginAt,
      endAt: endAt
    }

    if (accountId && !projectId) {
      projectId = await Project.idsbyContact(accountId)
    }

    const startDate = DateTime.fromObject({
      weekYear: year,
      weekNumber: weekNumber
    }).startOf('week')

    let filterBegin = startDate.startOf('week').toFormat('yyyy-MM-dd HH:mm:ss')
    let filterEnd = startDate.endOf('week').toFormat('yyyy-MM-dd HH:mm:ss')

    if (projectId || accountId) {
      filterBegin = startDate.startOf('year').toFormat('yyyy-MM-dd HH:mm:ss')
      filterEnd = startDate.endOf('year').toFormat('yyyy-MM-dd HH:mm:ss')
    }

    if (beginAt) {
      filterBegin = DateTime.fromFormat(beginAt, 'dd.MM.yyyy').toFormat('yyyy-MM-dd 00:00:00')
    }

    if (endAt) {
      filterEnd = DateTime.fromFormat(endAt, 'dd.MM.yyyy').toFormat('yyyy-MM-dd 23:59:59')
    }

    console.log(filterBegin, filterEnd, projectId, accountId)
    const times = await Time.query()
      .select('*')
      .debug(true)
      .withScopes((scopes) => scopes.withMinutes())
      .withScopes((scopes) => scopes.whereWeek(weekNumber, year))
      .withScopes((scopes) => scopes.wherePeriod(filterBegin, filterEnd))
      .withScopes((scopes) => scopes.whereStatus(status))
      .withScopes((scopes) => scopes.whereProject(projectId))
      .preload('project')
      .preload('category')
      .preload('user')
      .orderBy('begin_at', 'desc')

    const ids = []
    const dates = []
    for (const time of times) {
      const json = time.toJSON()
      ids.push(json.id)
      dates.push(DateTime.fromFormat(json.begin_at, 'dd.MM.yyyy HH:mm').toFormat('yyyy-MM-dd'))
    }

    console.log(ids)
    console.log(dates)

    const openTimesRows = await Time.query()
      .groupBy('project_id')
      .select(['project_id', 'invoice_id'])
      .whereIn('id', ids)
      .withScopes((scopes) => scopes.withMinutesSum())
      // .withScopes((scopes) => scopes.whereStatus(status))
      // .withScopes((scopes) => scopes.wherePeriod(filterBegin, filterEnd))
      // .withScopes((scopes) => scopes.whereProject(projectId))
      .preload('project', (query) => {
        query.preload('owner')
      })

    const groupedTimes = JSON.parse(JSON.stringify(groupBy(times, 'project.name')))

    for (const [key, value] of Object.entries(groupedTimes)) {
      const grouped = groupBy(value, 'ts')
      groupedTimes[key] = grouped
    }

    for (const [k, project] of Object.entries(groupedTimes)) {
      for (const [key, value] of Object.entries(project)) {
        groupedTimes[k][key] = {
          times: value,
          sum: sumBy(value, 'mins')
        }
      }
    }

    const sums = {
      minutes: sumBy(openTimesRows, 'mins'),
      hours: Math.ceil(sumBy(openTimesRows, 'mins') / 15) * 15 / 60
    }

    const oTimes = times.map(item => item.begin_at.toFormat('dd.MM.yyyy'))

    const start = min(dates)
    const end = max(dates)

    const startOfWeek = beginAt
    const endOfWeek = endAt

    const html = await view.render('pdf/times/coa.edge', {
      groupedTimes,
      openTimesRows,
      sums,
      start: DateTime.fromFormat(start, 'yyyy-MM-dd').toFormat('dd.MM.yyyy'),
      end: DateTime.fromFormat(end, 'yyyy-MM-dd').toFormat('dd.MM.yyyy')
    })

    const pdf = await PdfService.create(html)

    return response.download(pdf)
  }

  public async save ({ response, request, params }: HttpContextContract) {
    const payload = await request.all()
    const time = await Time.firstOrCreate({
      id: params.id || 0
    }, {
      project_id: payload.project_id
    })

    if (time) {
      time.begin_at = payload.begin_at
      time.end_at = payload.end_at
      time.project_id = payload.project_id
      time.time_category_id = payload.time_category_id
      time.user_id = payload.user_id
      time.invoice_id = payload.invoice_id ? 1 : 0
      time.note = payload.note
      time.is_billable = payload.is_billable
      time.is_locked = payload.is_locked

      await time.save()
      return response.redirect().clearQs().toPath('/times')
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const time = await Time.findOrFail(params.id)
    await time.delete()
    return response.redirect().clearQs().toPath('/times')
  }
}
