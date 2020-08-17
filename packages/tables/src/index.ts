import { Renderer, Part, LanguagesToParse, isPartCode } from '@code-blocks/types'
import { getMeta, parseDsv } from '@code-blocks/parser'
import createXml from 'xml-string'

const renderTable = (separator: string) =>
  (code: string) => {
    const { meta, content } = getMeta(code)
    const { head, data } = parseDsv(meta.separator || separator)(content)

    const div = createXml.create('div').attr({ 'class': meta.className || 'table-container' })
    const table = div.child('table')
  
    const thead = table.child('thead').child('tr')
    head.forEach(headLabel => { thead.child('th').data(headLabel) })

    const tbody = table.child('tbody')
    data.forEach(row => {
      const tr = tbody.child('tr')
      head.forEach(key => {
        tr.child('td').data(String(row[key]))
      })
    })

    return div.outer()
  }

export const acceptedLanguages = [
  'csv-table',
]

const renderer: Renderer = (languages: LanguagesToParse) => {
  const languagesToLookFor = Array.isArray(languages)
      ? languages.filter(language => acceptedLanguages.includes(language))
      : acceptedLanguages

  return async (part: Part) => {

    if (!isPartCode(part)) { return part }
    if (!languagesToLookFor.includes(part.language)) { return part }

    try {
      const content = renderTable(',')(part.content)
      return { type: 'other', content }
    } catch (err) {
      return part
    }
  }
}

export default renderer
