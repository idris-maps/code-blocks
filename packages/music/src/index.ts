import render from './render'
import { Renderer, Part, LanguagesToParse, isPartCode } from '@code-blocks/types'

const wrapInDiv = (svg: string) =>
  `<div class="music-sheet">${svg}</div>`

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

    try {
      return { type: 'other', content: wrapInDiv(await render(part.content)) }
    } catch (err) {
      return part
    }
  }
}

export default renderer