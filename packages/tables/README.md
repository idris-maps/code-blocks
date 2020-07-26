# `@code-blocks/tables`

Renders tables from code blocks

## Usage

```ts
import { Part } from '@code-blocks/types'
import tables from '@code-blocks/tables'

const part: Part = {
  type: 'code',
  language: 'csv-table',
  content: `
    Fruit, Amount
    Apple, 3
    Banana, 2
  `
}

tables()(part)
  .then(notCodePart => ) // { type: 'other', content: `<div class="table-container"><table>...</table></div>` }
```

Takes an optional argument `languages` (defaults to `*`) and returns an async function that takes a `Part` and returns a `Part`