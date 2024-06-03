import { Duration } from 'luxon'
import de from 'numbro/languages/de-DE'
import numbro from 'numbro'

numbro.registerLanguage(de, true)
numbro.setLanguage('de-DE')

export function useTemplateFilter () {
  const formatAccounId = (value) => {
    if (!value) return
    return numbro(value).format({ thousandSeparated: true })
  }

  const formatDuration = (value) => {
    if (!value) return
    const dur = Duration.fromObject({ minutes: value })
    return dur.toFormat('h:mm')
  }

  const formatCurrency = (value) => {
    if (!value) return
    return numbro(value).formatCurrency({ mantissa: 2, thousandSeparated: true, spaceSeparated: true })
  }

  function getImageUrl (name) {
    return new URL(`/${name}`, import.meta.env.VITE_APP_ASSETS).href
  }

  return { formatAccounId, formatCurrency, formatDuration, getImageUrl }
}
