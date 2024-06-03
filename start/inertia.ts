/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'
import Time from 'App/Models/Time'

Inertia.share({
  error: (ctx) => {
    return ctx.session.flashMessages.get('error')
  },
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors')
  },
  auth: (ctx) => {
    return { user: ctx.auth.user?.serialize() }
  },
  timers: async (ctx) => {
    if (!ctx.auth?.user) {
      return { timers: [] }
    }
    const timers = await Time.getRunningTimers(ctx.auth.user.id)
    return { timers }
  },
  route: (ctx) => {
    return {
      name: ctx.route?.name,
      params: ctx.params,
      path: ctx.route?.pattern,
      qs: ctx.request.qs()
    }
  },
  flash: (ctx) => {
    const json = {
      error: ctx.session.flashMessages.get('error') ?? null,
      success: ctx.session.flashMessages.get('success') ?? null
    }
    return json
  }
})

// .version(() => Inertia.manifestFile('public/dist/manifest.json'))
