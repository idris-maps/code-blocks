import { Part, LanguagesToParse, parseAllLanguages } from '@code-blocks/types'

export default (md: string, languages: LanguagesToParse): Part[] =>
  md.split('```')
    .map((d, i) =>
      i % 2 === 0
        ? { isCode: false, content: d }
        : { isCode: true, content: d }
    )
    .map(({ isCode, content }) => {
      if (isCode) {
        const [first, ...rest] = content.split('\n')
        const language = first.trim()
        if (parseAllLanguages(languages) || languages.includes(language)) {
          return {
            type: 'code',
            language,
            content: rest.join('\n').trim(),
          }
        }
        return {
          type: 'other',
          content: '```' + `${language}\n` + rest.join('\n') + '```'
        }
      }
      return {
        type: 'other',
        content,
      }
    })
