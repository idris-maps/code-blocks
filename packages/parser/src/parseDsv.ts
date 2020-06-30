import { trim } from 'ramda'
import { DsvDataItem } from '@code-blocks/types'

const castType = (cell: string): boolean | number | string => {
  if (cell === 'true') { return true }
  if (cell === 'false') { return false }
  const num = Number(cell)
  if (!Number.isNaN(num)) { return num }
  return cell
}

const separateLine = (separator: string) =>
  (line: string) =>
    line
      .split(separator)
      .map(trim)

export default (separator: string) =>
  (content: string): { data: DsvDataItem[], head: string[] } => {
    const [head, ...body] = content.split('\n').map(separateLine(separator))
    const data = body
      .map(line =>
        head.reduce((r, key, i) => ({
          ...r,
          [String(key)]: castType(line[i]),
        }), {})
      )
    if (data.length === 0) {
      throw new Error(`
        Could not parse as DSV with "${separator}" separator:
        ${content}
      `)
    }
    return { head, data }
  }