import { BaseCommand } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

export default class ConvertTimes extends BaseCommand {
  public static commandName = 'convert:times'
  public static description = ''

  public static settings = {
    loadApp: true,
    stayAlive: false
  }

  public async run () {
    const { default: Time } = await import('App/Models/Time')
    const results = await Database
      .connection('convert')
      .from('times')
      .select('*')
      .where('date', '>', '2020-12-31')

    const projects = {
      161: 10,
      163: 1,
      204: 9,
      214: 4
    }

    const services = {
      1: 8,
      4: 1,
      5: 2,
      10: 1
    }

    for (const record of results) {
      if (record.project_id) {
        const date = DateTime.fromJSDate(record.date)

        const beginAt = date.toFormat('yyyy-MM-dd')
        // eslint-disable-next-line max-len
        const endAt = record.begin < record.end ? date.toFormat('yyyy-MM-dd') : date.plus({ months: 1 }).toFormat('yyyy-MM-dd')

        const oBegin = DateTime.fromSQL(beginAt + ' ' + record.begin)
        const oEnd = DateTime.fromSQL(endAt + ' ' + record.end)

        await Time.create({
          project_id: projects[record.project_id],
          time_category_id: services[record.service_id],
          invoice_id: record.invoice_id,
          user_id: record.user_id,
          begin_at: oBegin,
          end_at: oEnd,
          note: record.note,
          minutes: record.minutes
        })

        console.log(oBegin.toFormat('yyyy-MM-dd HH:mm'), oEnd.toFormat('yyyy-MM-dd HH:mm'))
      }
    }
  }
}
