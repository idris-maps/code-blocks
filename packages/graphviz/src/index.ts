import { Renderer, LanguagesToParse, Part, isPartCode } from '@code-blocks/types'
import { getMeta } from '@code-blocks/parser'
import render from './render'

export const acceptedLanguages = ['graphviz']

const wrapInDiv = (svg: string, className: string = 'diagram') =>
  `<div class="${className}">${svg}</div>`

const replace = (toRemove: string, toAdd: string) =>
  (string: string) =>
    string.split(toRemove).join(toAdd)

const replaceQuotes = replace('&quot;', '"')
const replaceGt = replace('&gt;', '>')
const replaceLt = replace('&lt;', '<')

const fixContent = (content: string) =>
  replaceQuotes(
    replaceGt(
      replaceLt(content)
    )
  )

const renderer: Renderer = (languages: LanguagesToParse) => {
  const languagesToLookFor = Array.isArray(languages)
    ? languages.filter(language => acceptedLanguages.includes(language))
    : acceptedLanguages
  
  return async (part: Part) => {
    if (!isPartCode(part)) { return part }
    if (!languagesToLookFor.includes(part.language)) { return part }
  
    const { meta, content } = getMeta(part.content)
    try {
      return {
        type: 'other',
        content: wrapInDiv(await render(fixContent(content), meta), meta.className),
      }
    } catch (err) {
      return part
    }
  }
}

export default renderer