import { View, parse } from 'vega'
import { compile } from 'vega-lite'

const removeWidthAndHeight = (svg: string) => {
  const [svgTag, ...rest] = svg.split('>')
  const svgAttrs = svgTag.split(' ')
  return [
    svgAttrs.filter(d => !d.startsWith('width=') && !d.startsWith('height=')).join(' '),
    ...rest,
  ].join('>')
}

export const renderVega = async (json: any) => {
  const view = new View(parse(json))
  return removeWidthAndHeight(await view.toSVG())
}

export const renderVegalite = async (json: any) => {
  const { spec } = compile(json)
  return await renderVega(spec)
}
