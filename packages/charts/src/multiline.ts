import { renderVegalite } from './vega'
import { Meta, DsvDataItem } from '@code-blocks/types'

interface Config {
  width: string
  height: string
  temporal?: boolean
  [key: string]: any
}

const defaultConfig: Config = {
  width: '400',
  height: '200',
}

export default async (
  { head, data }: { head: string[], data: DsvDataItem[] },
  meta: Meta = {}
) => {
  const multilineConfig = { ...defaultConfig, ...meta }
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": multilineConfig.width,
    "height": multilineConfig.height,
    "data": {
      "values": data,
    },
    "mark": "line",
    "encoding": {
      "x": {"field": head[0], "type": multilineConfig.temporal ? "temporal" : "ordinal" },
      "y": {"field": head[1], "type": "quantitative"},
      "color": {"field": head[2], "type": "nominal"}
    }
  }
  return await renderVegalite(spec)
}