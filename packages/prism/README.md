# `@code-blocks/prism`

renders code blocks so that they can be highlighted with [prism CSS](https://prismjs.com/#basic-usage)

## Usage

```ts
import { Part } from '@code-blocks/types'
import highlight from '@code-blocks/prism'

const part: Part = {
  type: 'code',
  language: 'js',
  content: `
    const sayHello = name => console.log('Hello ' + name)
  `
}

highlight()(part)
  .then(notCodePart => ) // { type: 'other', content: `<pre class="language-js">...</pre>` }
```