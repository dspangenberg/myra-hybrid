import { DateTime, Duration } from 'luxon'
import { existsSync, readFileSync } from 'fs'

import View from '@ioc:Adonis/Core/View'
import de from 'numbro/languages/de-DE'
import { marked } from 'marked'
import numbro from 'numbro'
import Application from '@ioc:Adonis/Core/Application'

numbro.registerLanguage(de, true)
numbro.setLanguage('de-DE')

View.global('viteProduction', function () {
  const jsonFile = Application.publicPath('dist/manifest.json')

  if (existsSync(jsonFile)) {
    const manifest = readFileSync(jsonFile, 'utf8')
    const json = JSON.parse(manifest)

    const js = json['resources/js/app.js'].file
    const css = json['resources/js/app.js'].css[0]

    const script = `<script type="module" src="/dist/${js}"></script>\n`
    const style = `<link rel="stylesheet" href="/dist/${css}">`

    const view = View.GLOBALS.safe(script + style)
    return view
  }

  return null
})

const nl2br = (str, isXHTML = false) => {
  if (typeof str === 'undefined' || str === null) {
    return ''
  }
  const breakTag = (isXHTML || typeof isXHTML === 'undefined') ? '<br />' : '<br>'
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
}

View.global('md', (value) => {
  return marked.parse(value)
})

View.global('nl2br', (value) => {
  return nl2br(value)
})

View.global('lux', (value, format = 'dd.MM.yyyy') => {
  let date = DateTime.fromFormat(value, 'dd.MM.yyyy HH:mm')
  if (!date.isValid) {
    date = DateTime.fromISO(value)
  }

  return date.setLocale('de').toFormat(format)
})

View.global('float', (value) => {
  return numbro(value).format({ mantissa: 2, thousandSeparated: true, spaceSeparated: true })
})

View.global('now', (format = 'dd.MM.yyyy') => {
  const date = DateTime.now().setLocale('de').toFormat(format)
  return date
})

View.global('duration', (value) => {
  if (value) {
    const dur = Duration.fromObject({ minutes: value })
    return dur.toFormat('h:mm')
  }
  return '0:00'
})
