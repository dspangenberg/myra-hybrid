import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class TimeValidator {
  public schema = schema.create({
    note: schema.string.optional({ trim: true }),
    begin_at: schema.date({ format: 'dd.MM.yyyy HH:mm' }),
    end_at: schema.date.nullableAndOptional({ format: 'dd.MM.yyyy HH:mm' }),
    project_id: schema.number.optional([
      rules.exists({ table: 'projects', column: 'id' })
    ]),
    time_category_id: schema.number.optional([
      rules.exists({ table: 'time_categories', column: 'id' })
    ]),
    user_id: schema.number.optional([
      rules.exists({ table: 'users', column: 'id' })
    ])
  })

  public messages = {}
}
