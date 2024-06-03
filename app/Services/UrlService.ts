import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'

export default class UrlService {
  public static sign (rName, tenant, params = {}, expires = '5m', sub = ':tenant') {
    const url = Route
      .builderForDomain(`${sub}.${Env.get('APP_DOMAIN')}`)
      .params(params)
      .prefixUrl(Env.get('APP_URL').replace('{sub}', tenant))
      .makeSigned(rName, { expiresIn: expires })
    return url
  }

  public static make (rName, tenant, params = {}, sub = ':tenant') {
    // clear QS
    const url = Route
      .builderForDomain(`${sub}.${Env.get('APP_DOMAIN')}`)
      .params(params)
      .prefixUrl(Env.get('APP_URL').replace('{sub}', tenant))
      .make(rName)
    return url
  }
}
