import { Renderer, LanguagesToParse, Part, isPartCode } from '@code-blocks/types'
import { registered, highlight, listLanguages } from 'refractor'
import rehype from 'rehype'

export const acceptedLanguages = listLanguages()

const replace = (toRemove: string, toAdd: string) =>
  (string: string) =>
    string.split(toRemove).join(toAdd)

const replaceQuotes = replace('&quot;', '"')
const replaceGt = replace('&gt;', '>')
const replaceLt = replace('&lt;', '<')
const replaceAmp = replace('&amp;', '&')

const fixContent = (content: string) =>
  replaceQuotes(
    replaceGt(
      replaceLt(
        replaceAmp(content)
      )
    )
  )

const renderer: Renderer = (languages: LanguagesToParse = '*') => {

  return async (part: Part) => {

    if (!isPartCode(part)) { return part }
    
    const { language, content } = part

    if (!registered(language)) { return part }

    try {
      const nodes = highlight(fixContent(content), language)
      const innerHTML = rehype()
        .stringify({type: 'root', children: nodes})
        .toString()
      return {
        type: 'other',
        content: [
          `<pre class="language-${language}">`,
          `<code class="language-${language}">`,
          innerHTML,
          `</code>`,
          `</pre>`,
        ].join(''),
      }
    } catch (err) {
      return part
    }
  }
}

export default renderer
