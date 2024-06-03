import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async createRedirect ({ response }: HttpContextContract) {
    return response.redirect().clearQs().toPath('/auth/login')
  }

  public async create ({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Login', {
      layout: 'Auth'
    })
  }

  public async login ({ request, response, session, auth }: HttpContextContract) {
    const { email, password, remember } = request.all()

    try {
      const user = await User
        .query()
        .where('email', email)
        .firstOrFail()
      if ((await Hash.verify(user.password, password))) {
        await auth.use('web').login(user, remember)
        return response.redirect().clearQs().toPath('/')
      }
    } catch (error) {
      console.error(error)
    }
    session.flash(
      'error',
      {
        title: 'Wir konnten Dich leider nicht anmelden.',
        text: 'Entweder ist uns die E-Mail-Adresse unbekannt oder Du hast ein falsches Kennwort eingegeben.'
      }
    )
    return response.redirect().back()
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect().clearQs().toPath('/auth/login')
  }
}
