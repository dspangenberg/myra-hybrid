import Contact from 'App/Models/Contact'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import ProjectCategory from 'App/Models/ProjectCategory'
import User from 'App/Models/User'

export default class ProjectsController {
  public async index ({ inertia, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const projects = await Project.query()
      .orderBy('name')
      .preload('category')
      .preload('times', (query) => {
        query
          .withScopes((scopes) => scopes.withMinutesSum())
          .whereNull('invoice_id')
          .groupBy('project_id')
      })
      .preload('owner', (query) => {
        query.preload('company').preload('title')
      })
      .paginate(page, limit)
    projects.baseUrl('/projects')

    const meta = Object.assign({}, projects.getMeta())
    meta.range = projects.getUrlsForRange(1, projects.lastPage)

    meta.from = (page - 1) * limit + 1
    meta.to = meta.current_page === meta.last_page ? meta.total : meta.from + limit - 1

    const companies = await Contact.query()
      .where('is_org', 1)
      .preload('title')
      .preload('salutation')
      .orderBy('name')
    const projectCategories = await ProjectCategory.all()

    return inertia.render('App/Projects', {
      projects, meta, companies, projectCategories
    })
  }

  public async show ({ inertia, params }: HttpContextContract) {
    const project = await Project.query().where('id', params.id)
      .preload('category')
      .preload('leader')
      .preload('manager')
      .preload('owner', (query) => {
        query.preload('company').preload('title')
      })
      .first()
    return inertia.render('App/Projects/ProjectsDetails', {
      project
    })
  }

  public async edit ({ inertia, params }: HttpContextContract) {
    const project = await Project.query().where('id', params.id)
      .preload('category')
      .preload('owner', (query) => {
        query.preload('company').preload('title').preload('company').preload('title').preload('contacts')
      })
      .preload('manager', (query) => {
        query.preload('company').preload('title').preload('company').preload('title')
      })
      .preload('leader')
      .first()

    const companies = await Contact.query()
      .where('is_org', 1)
      .preload('title')
      .preload('salutation')
      .orderBy('name')

    const projectCategories = await ProjectCategory.all()
    const contacts = await Contact.query().preload('company').preload('title').orderBy('name')
    const users = User.all()

    return inertia.render('App/Projects/ProjectsEdit', {
      companies,
      contacts,
      project,
      projectCategories,
      users
    })
  }

  public async create ({ response, request }: HttpContextContract) {
    const fields = request.all()
    const project = await Project.create({
      name: fields.name,
      owner_contact_id: fields.owner_contact_id,
      project_category_id: fields.project_category_id
    })

    await project.save()
    return response.redirect().clearQs().toPath('/projects/' + project.id)
  }

  public async save ({ response, request, params }: HttpContextContract) {
    const project = await Project.find(params.id)
    if (project) {
      const fields = request.all()
      const keys = Project.$columnsDefinitions.keys()

      console.log(fields)

      const omitFields = ['created_at', 'updated_at', 'id', 'deleted_at']

      const data = {}
      for (const key of keys) {
        if (!omitFields.includes(key)) {
          data[key] = fields[key]
        }
      }

      project.merge(data)

      await project.save()
      return response.redirect().clearQs().toPath('/projects/' + params.id)
    }

    return response.redirect().clearQs().toPath('/projects/')
  }
}
