import { renderVegalite } from './vega'
import { Meta, DsvDataItem } from '@code-blocks/types'

interface Config {
  width: string
  height: string
  color: string
  [key: string]: any
}

const defaultConfig: Config = {
  width: '400',
  height: '200',
  color: 'steelblue',
}

export default async (
  { head, data }: { head: string[], data: DsvDataItem[] },
  meta: Meta = {}
) => {
  const barConfig = { ...defaultConfig, ...meta }
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": barConfig.width,
    "height": barConfig.height,
    "data": {
      "values": data,
    },
    "mark": "bar",
    "encoding": {
      "x": {"field": head[0], "type": "ordinal" },
      "y": {"field": head[1], "type": "quantitative"},
      "color": { "value": barConfig.color }
    }
  }
  return await renderVegalite(spec)
}