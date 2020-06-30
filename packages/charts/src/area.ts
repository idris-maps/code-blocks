import { renderVegalite } from './vega'
import { Meta, DsvDataItem } from '@code-blocks/types'

interface Config {
  width: string
  height: string
  color: string
  temporal?: boolean
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
  const lineConfig = { ...defaultConfig, ...meta }
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": lineConfig.width,
    "height": lineConfig.height,
    "data": {
      "values": data,
    },
    "mark": "area",
    "encoding": {
      "x": {"field": head[0], "type": lineConfig.temporal ? "temporal" : "ordinal" },
      "y": {"field": head[1], "type": "quantitative"},
      "color": { "value": lineConfig.color }
    }
  }
  return await renderVegalite(spec)
}