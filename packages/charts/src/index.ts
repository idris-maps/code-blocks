import { Renderer, LanguagesToParse, Part, isPartCode } from '@code-blocks/types'
import { getMeta, parseDsv, parseJson } from '@code-blocks/parser'
import areaChart from './area'
import barChart from './bar'
import lineChart from './line'
import multilineChart from './multiline'
import pieChart from './pie'
import { renderVega, renderVegalite } from './vega'

const wrapInDiv = (svg: string) =>
  `<div class="chart">${svg}</div>`

const chartRenderers = [
  { language: 'area-chart', render: (content: string) => areaChart(parseDsv(',')(content), getMeta(content)) },
  { language: 'bar-chart', render: (content: string) => barChart(parseDsv(',')(content), getMeta(content)) },
  { language: 'line-chart', render: (content: string) => lineChart(parseDsv(',')(content), getMeta(content)) },
  { language: 'multiline-chart', render: (content: string) => multilineChart(parseDsv(',')(content), getMeta(content)) },
  { language: 'pie-chart', render: (content: string) => pieChart(parseDsv(',')(content), getMeta(content)) },
  { language: 'vega', render: (content: string) =>  renderVega(parseJson(content)) },
  { language: 'vegalite', render: (content: string) => renderVegalite(parseJson(content)) },
]

export const acceptedLanguages = chartRenderers.map(d => d.language)

const renderer: Renderer = (languages: LanguagesToParse = '*') => {

  const languagesToLookFor = Array.isArray(languages)
    ? languages.filter(language => acceptedLanguages.includes(language))
    : acceptedLanguages

  return async (part: Part) => {

    if (!isPartCode(part)) { return part }
    if (!languagesToLookFor.includes(part.language)) { return part }

    const func = chartRenderers.find(({ language }) => language === part.language)
    if (!func) { return part }

    return { type: 'other', content: wrapInDiv(await func.render(part.content)) }

  }
}
export default renderer


