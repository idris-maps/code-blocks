import { Renderer, LanguagesToParse, Part, isPartCode, DsvDataItem, Meta } from '@code-blocks/types'
import { getMeta, parseDsv, parseJson } from '@code-blocks/parser'
import areaChart from './area'
import barChart from './bar'
import lineChart from './line'
import multilineChart from './multiline'
import pieChart from './pie'
import { renderVega, renderVegalite } from './vega'

const wrapInDiv = (svg: string) =>
  `<div class="chart">${svg}</div>`

type DsvRenderer = (dsv: { head: string[], data: DsvDataItem[] }, meta?: Meta) => Promise<string>

const renderDsvChart = (dsvRenderer: DsvRenderer) => (data: string) => {
  const { meta, content } = getMeta(data)
  return dsvRenderer(parseDsv(',')(content), meta)
}

const chartRenderers = [
  { language: 'area-chart', render: renderDsvChart(areaChart) },
  { language: 'bar-chart', render: renderDsvChart(barChart) },
  { language: 'line-chart', render: renderDsvChart(lineChart) },
  { language: 'multiline-chart', render: renderDsvChart(multilineChart) },
  { language: 'pie-chart', render: renderDsvChart(pieChart) },
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


