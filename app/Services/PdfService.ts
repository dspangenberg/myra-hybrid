import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import Env from '@ioc:Adonis/Core/Env'
import execa from 'execa'
import tempy from 'tempy'

export default class PdfService {
  public static async create (html, filename = null) {
    const htmlFile = tempy.file({ extension: 'html' })
    await Drive.put(htmlFile, html)

    let pdfFile
    if (filename === null) {
      pdfFile = tempy.file({ extension: 'pdf' })
    } else {
      pdfFile = Application.tmpPath(`uploads/${filename}.pdf`)
    }

    await execa(Env.get('WEASYPRINT_BIN'), [htmlFile, pdfFile])

    return pdfFile
  }
}
