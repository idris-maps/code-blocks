# `@code-blocks/from-md`

Extracts code blocks from markdown.

## Usage

```ts
import fromMD from '@code-blocks/from-md'

fromMD(someHTML, ['line-chart', 'csv-table'])
```

Takes tow arguments:

* `md` a string containing markdown
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