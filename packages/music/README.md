# `@code-blocks/music`

Renders music from code blocks with [abc notation](http://abcnotation.com/) using [abcjs](https://github.com/paulrosen/abcjs).

## Usage

```ts
import { Part } from '@code-blocks/types'
import music from '@code-blocks/music'

const part: Part = {
  type: 'code',
  language: 'music-abc',
  content: `
    X:1
    K:D
    DDAA|BBA2|
  `
}

music()(part)
  .then(notCodePart => ) // { type: 'other', content: `<div class="music-sheet"><svg>...</svg></div>` }
```

Takes an optional argument `languages` (defaults to `*`) and returns an async function that takes a `Part` and returns a `Part`