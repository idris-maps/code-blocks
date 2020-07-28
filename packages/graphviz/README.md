# `@code-blocks/graphviz`

Renders a graphviz diagram from code blocks

## Usage

```ts
import { Part } from '@code-blocks/types'
import graphviz from '@code-blocks/graphviz'

const part: Part = {
  type: 'code',
  language: 'graphviz',
  content: 'digraph { a -> b }'
}

graphviz()(part)
  .then(notCodePart => ) // { type: 'other', content: `<div class="chart"><svg>...</svg></div>` }
```

Takes an optional argument `languages` (defaults to `*`) and returns an async function that takes a `Part` and returns a `Part`
