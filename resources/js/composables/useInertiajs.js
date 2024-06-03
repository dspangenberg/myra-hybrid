import { stardust } from '@eidellev/adonis-stardust'
import { usePage } from '@inertiajs/inertia-vue3'

export function useInertiajs () {
  const currentRoute = () => {
    const route = stardust.current // .replace('$_', '')
    return route
    // return stardust.getRoutes()[route]
  }

  const alternateRoutes = (controller) => {
    for (const [key, value] of Object.entries(stardust.getRoutes())) {
      if (key === controller) {
        return true
      }
    }
    return false
  }

  const $route = () => {
    return usePage().props.value.route
  }

  const isCurrent = (route) => {
    return route === currentRoute()
  }

  const route = (route, params = {}, qs = {}) => {
    return stardust.route(route, params, qs).replace('$_', '')
  }

  return { currentRoute, isCurrent, route, $route }
}
