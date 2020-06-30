# `@code-blocks/charts`

Renders charts from code blocks

## Usage

```ts
import { Part } from '@code-blocks/types'
import charts from '@code-blocks/charts'

const part: Part = {
  type: 'code',
  language: 'bar-chart',
  content: `
    Fruit, Amount
    Apple, 3
    Banana, 2
  `
}

charts()(part)
  .then(notCodePart => ) // { type: 'other', content: `<div class="chart"><svg>...</svg></div>` }
```
