# `@code-blocks/parser`

Parses code blocks, with or without front-matter, as JSON or DSV.

## Usage

```ts
import {
  getMeta,
  parseDsv,
  parseJson,
} from '@code-blocks/parser'
```

### `getMeta`

Extracts meta data from front-matter. Takes the content of a code block and returns an object with two keys `meta` (a JSON object with the meta data) and `content` (the rest of the code block).

### `parseDsv`

Parses the content as delimiter separated values. Takes the separator as argument and returns a function that takes the content of the code block and returns an array of JSON objects.

### `parseJson`

Parses the content as JSON. Takes the content as only argument and returns a JSON object.