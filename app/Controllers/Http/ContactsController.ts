import AddressCategory from 'App/Models/AddressCategory'
import Contact from 'App/Models/Contact'
import ContactEmail from 'App/Models/ContactEmail'
import ContactPhone from 'App/Models/ContactPhone'
import Country from 'App/Models/Country'
import EmailCategory from 'App/Models/EmailCategory'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PaymentDeadline from 'App/Models/PaymentDeadline'
import PhoneCategory from 'App/Models/PhoneCategory'
import Salutation from 'App/Models/Salutation'
import Tax from 'App/Models/Tax'
import Title from 'App/Models/Title'

export default class ContactsController {
  public async index ({ inertia, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const contacts = await Contact.query() // .whereNotNull('debtor_number')
      .preload('company').preload('title').orderBy('name').debug(true).paginate(page, limit)
    contacts.baseUrl('/contacts')

    const meta = Object.assign({}, contacts.getMeta())
    meta.range = contacts.getUrlsForRange(1, contacts.lastPage)

    meta.from = (page - 1) * limit + 1
    meta.to = meta.current_page === meta.last_page ? meta.total : meta.from + limit - 1

    return inertia.render('App/Contacts', {
      contacts, meta
    })
  }

  public async show ({ inertia, params }: HttpContextContract) {
    const contact = await Contact.query().where('id', params.id)
      .preload('company')
      .preload('title')
      .preload('salutation')
      .preload('addresses', (query) => {
        query.preload('country').preload('category')
      })
      .preload('emails', (query) => {
        query.preload('category')
      })
      .preload('projects', (query) => {
        query.preload('times', (query) => {
          query
            .withScopes((scopes) => scopes.withMinutesSum())
            .whereNull('invoice_id')
            .groupBy('project_id')
        })
          .preload('category')
      })
      .preload('phones', (query) => {
        query.preload('category')
      })
      .preload('contacts', (query) => {
        query
          .preload('salutation').preload('title').orderBy('name')
          .preload('phones', (query) => {
            query.preload('category').orderBy('pos').orderBy('id')
          })
          .preload('emails', (query) => {
            query.preload('category').orderBy('pos').orderBy('id')
          })
      })
      .first()
    return inertia.render('App/Contacts/ContactsDetails', {
      contact
    })
  }

  public async edit ({ inertia, params }: HttpContextContract) {
    const companies = await Contact.query()
      .where('is_org', 1)
      .preload('title')
      .preload('salutation')
      .orderBy('name')
    const salutations = await Salutation.all()
    const titles = await Title.all()

    const taxes = await Tax.all()
    const paymentDeadlines = await PaymentDeadline.all()
    const addressCategories = await AddressCategory.all()
    const emailCategories = await EmailCategory.all()
    const phoneCategories = await PhoneCategory.all()
    const countries = await Country.all()

    const contact = await Contact.query().where('id', params.id)
      .preload('company')
      .preload('title')
      .preload('salutation')
      .preload('addresses', (query) => {
        query.preload('country').preload('category')
      })
      .preload('emails', (query) => {
        query.preload('category')
      })
      .preload('phones', (query) => {
        query.preload('category')
      })
      .first()
    return inertia.render('App/Contacts/ContactsEdit', {
      contact,
      addressCategories,
      companies,
      countries,
      paymentDeadlines,
      emailCategories,
      phoneCategories,
      salutations,
      taxes,
      titles
    })
  }

  public async save ({ response, request, params }: HttpContextContract) {
    const contact = await Contact.find(params.id)
    if (contact) {
      const fields = request.all()
      const keys = Contact.$columnsDefinitions.keys()

      console.log(fields)

      const omitFields = ['created_at', 'updated_at', 'id', 'deleted_at']

      const data = {}
      for (const key of keys) {
        if (!omitFields.includes(key)) {
          data[key] = fields[key]
        }
      }

      contact.merge(data)
      await contact.save()

      if (fields.phones.length) {
        for (const phone of fields.phones) {
          const record = await ContactPhone.firstOrCreate(
            { id: phone.id },
            {
              contact_id: contact.id
            }
          )
          record.phone_category_id = phone.phone_category_id
          record.phone = phone.phone
          record.pos = phone.pos
          await record.save()
        }
      }

      if (fields.emails.length) {
        for (const email of fields.emails) {
          const record = await ContactEmail.firstOrCreate(
            { id: email.id },
            {
              contact_id: contact.id
            }
          )
          record.email_category_id = email.email_category_id
          record.email = email.email
          record.pos = email.pos
          await record.save()
        }
      }

      return response.redirect().clearQs().toPath('/contacts/' + params.id)
    }

    return response.redirect().clearQs().toPath('/contacts/')
  }
}
