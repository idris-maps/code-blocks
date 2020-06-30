import { View, parse } from 'vega'
import { compile } from 'vega-lite'

export const renderVega = async (json: any) => {
  const view = new View(parse(json))
  return await view.toSVG()
}

export const renderVegalite = async (json: any) => {
  const { spec } = compile(json)
  return await renderVega(spec)
}