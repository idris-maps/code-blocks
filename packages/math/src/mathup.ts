import { Meta } from '@code-blocks/types'
const mathup = require('mathup')

interface MathUpOptions {
  decimalMark?: string
  colSep?: string
  rowSep?: string
  display?: string
  dir?: string
  bare?: boolean
}

const defaultOptions: MathUpOptions = {
  decimalMark: ".",
  colSep: ",",
  rowSep: ";",
  display: "inline",
  dir: "ltr",
  bare: false,
};

const metaToOptions = (meta?: Meta): MathUpOptions =>
  meta
    ? Object.keys(defaultOptions)
      .reduce((r, key) => {
        const value = meta[key]
        if (!value) { return r }
        if (key === 'bare') {
          return { ...r, bare: value === 'true' }
        }
        return { ...r, [key]: value }
      }, {})
    : {}

export default (expression: string, meta?: Meta): string =>
  mathup(expression, { ...defaultOptions, ...metaToOptions(meta) })
