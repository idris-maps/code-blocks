import render from './render'
import { Renderer, Part, LanguagesToParse, isPartCode } from '@code-blocks/types'
import { getMeta } from '@code-blocks/parser'

const wrapInDiv = (svg: string, className: string = 'music-sheet') =>
  `<div class="${className}">${svg}</div>`

const acceptedLanguages = [
  'music-abc'
]

const renderer: Renderer = (languages: LanguagesToParse = '*') => {
  const languagesToLookFor = Array.isArray(languages)
    ? languages.filter(language => acceptedLanguages.includes(language))
    : acceptedLanguages

  return async (part: Part) => {

    if (!isPartCode(part)) { return part }
    if (!languagesToLookFor.includes(part.language)) { return part }

    const { meta, content } = getMeta(part.content)

    try {
      return { type: 'other', content: wrapInDiv(await render(content), meta.className) }
    } catch (err) {
      return part
    }
  }
}

export default renderer
