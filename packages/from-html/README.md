# `@code-blocks/from-html`

Extracts code blocks from HTML.

## Usage

```ts
import fromHTML from '@code-blocks/from-html'

fromHTML(someHTML, ['line-chart', 'csv-table'])
```

Takes two arguments:

* `html` a string containing HTML
* `languages` an array of languages to extract

Returns an array of parts:

```ts
export interface PartCode {
  type: 'code'
  language: string
  content: string
}

export interface PartOther {
  type: 'other'
  content: string
}

export type Part = PartCode | PartOther
```