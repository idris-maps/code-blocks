import { flatten } from 'ramda'
import { Part, parseAllLanguages, LanguagesToParse } from '@code-blocks/types'

interface PreSplit {
  isPre: boolean
  content: string
}

const splitPre = (html: string): PreSplit[] =>
  flatten(
    html.split('<pre>').map((d, i) => {
      if (i === 0) { return [{ isPre: false, content: d }] }
      const [before, after] = d.split('</pre>')
      return [
        { isPre: true, content: before },
        { isPre: false, content: after },
      ]
    })
  )

const hasLanguage = (d: string) => d.includes('class="language-')

const parsePreSplit = (languages: LanguagesToParse) =>
  ({ isPre, content }: PreSplit): Part => {
    if (!isPre) {
      return {
        type: 'other',
        content,
      }
    }
    const [_, noCode] = content.split('<code')
    const [codeAttributes, ...rest] = noCode.split('>')
    const code = rest.join('>').split('</code>')[0]
    const language = hasLanguage(codeAttributes)
      ? codeAttributes.split('class="language-')[1].split('"')[0]
      : ''
    if (parseAllLanguages(languages) || languages.includes(language)) {
      return {
        type: 'code',
        language,
        content: code.trim(),
      }
    }
    return {
      type: 'other',
      content: `<pre>${content}</pre>`,
    }
  }

export default (html: string, languages: LanguagesToParse) => {
  return splitPre(html).map(parsePreSplit(languages))
}
