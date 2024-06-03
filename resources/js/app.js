import '../css/app.css'
import '../css/fonts.css'
import 'virtual:svg-icons-register'

import { App, Link, plugin } from '@inertiajs/inertia-vue3'
import { createApp, defineAsyncComponent, h } from 'vue'

import { InertiaProgress } from '@inertiajs/progress'
import { createPinia } from 'pinia'
import { toSnakeCase } from './Utils/StringHelper.js'
import tooltipDirective from './directives/Tooltip.js'

const components = import.meta.glob('./Components/**/*.vue')
const pages = import.meta.glob('./Pages/**/*.vue')
const layouts = import.meta.glob('./Layouts/**/*.vue')

const importPage = async (name) => {
  const page = await (pages[`./Pages/${name}.vue`])()
  return page.default
}

const importLayout = async (name) => {
  const layout = await (layouts[`./Layouts/${name}.vue`])()
  return layout.default
}

const el = document.getElementById('app')

const app = createApp({
  render: () =>
    h(App, {
      initialPage: JSON.parse(el.dataset.page),
      titleCallback: (title) => `${title} - twiceware_myra`,
      resolveComponent: async (name) => {
        if (name === undefined) {
          location.reload()
          return false
        }

        const page = await importPage(name)

        let layout = 'App'

        if (page && page.layout && typeof page.layout === 'string') {
          layout = page.layout
        }

        if (name.includes('Auth')) {
          layout = 'Auth'
        }

        page.layout = await importLayout(layout)
        return page
      }
    })
})

app.component('Link', Link)
app.component('InertiaLink', Link)
app.use(createPinia())
app.directive('tooltip', {
  mounted (el, binding) {
    tooltipDirective(el, binding)
  },
  updated (el, binding) {
    tooltipDirective(el, binding)
  }
})

Object.entries(components).forEach(([path, component]) => {
  let name = path.split('/').slice(-1)[0].replace('.vue', '')
  if (path.includes('Jetstream')) {
    name = toSnakeCase(('jet' + path.split('/').slice(-1)[0].replace('.vue', ''))).replaceAll('_', '-')
  }

  if (path.includes('Stormy')) {
    name = toSnakeCase(('stormy' + path.split('/').slice(-1)[0].replace('.vue', ''))).replaceAll('_', '-')
  }

  app.component(name, defineAsyncComponent(component))
})

InertiaProgress.init()

app.use(plugin)
app.mount(el)

app.provide('$page', app.config.globalProperties.$page)
