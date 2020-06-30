import test, { Implementation } from 'ava'
import areaChart from '../src/area'
import barChart from '../src/bar'
import lineChart from '../src/line'
import pieChart from '../src/pie'
import multiLineChart from '../src/multiline'
import { Meta, DsvDataItem } from '@code-blocks/types'
import { writeFile } from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'

const saveSvg = (svg: string, fileName: string) =>
  promisify(writeFile)(resolve(__dirname, 'svgs', `${fileName}.svg`), svg, 'utf-8')

const getTemporalData = () =>
  Array.from(Array(5))
    .map((_, i) => ({
      'Day': `2020-0${i}-01`,
      'Value': Math.round(Math.random() * 20),
    }))

const head = ['Fruit', 'Amount']
const data: DsvDataItem[] = [
  { 'Fruit': 'Apple', 'Amount': 1 },
  { 'Fruit': 'Banana', 'Amount': 2 },
]

const temporalHead = ['Day', 'Value']
const temporalData = getTemporalData()

const multilineHead = ['Day', 'Value', 'Stock']
const multilineData = [
  ...getTemporalData().map(d => ({ ...d, 'Stock': 'AAA' })),
  ...getTemporalData().map(d => ({ ...d, 'Stock': 'BBB' })),
]

const isSvg = (d: any) =>
  typeof d === 'string' && d.startsWith('<svg')

const check = async (
  test: (title: string, implementation: Implementation<unknown>) => void,
  fileName: string,
  data: DsvDataItem[],
  head: string[],
  func: ({ head, data }: { head: string[], data: DsvDataItem[] }, meta?: Meta) => Promise<string>,
  meta: Meta = {},
) => {
  test(`charts ${fileName}`, async t => {
    const result = await func({ data, head }, meta)
    await saveSvg(result, fileName)
    t.true(isSvg(result), fileName)
  })
}

check(test, 'area', data, head, areaChart)
check(test, 'area-temp', temporalData, temporalHead, areaChart, { temporal: true })
check(test, 'bar', data, head, barChart)
check(test, 'line', data, head, lineChart)
check(test, 'line-temp', temporalData, temporalHead, lineChart, { temporal: true })
check(test, 'pie', data, head, pieChart)
check(test, 'multiline', multilineData, multilineHead, multiLineChart, { temporal: true })
