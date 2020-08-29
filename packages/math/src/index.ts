import { Renderer, LanguagesToParse, Part, isPartCode } from '@code-blocks/types'
import { getMeta } from '@code-blocks/parser'
import mathup from './mathup'

export const acceptedLanguages = ['mathup']

const wrapInDiv = (svg: string, className: string = 'mathup') =>
  `<div class="${className}">${svg}</div>`

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
          content: wrapInDiv(await mathup(content, meta), meta.className),
        }
      } catch (err) {
        return part
      }
    }
  }
  
  export default renderer
  