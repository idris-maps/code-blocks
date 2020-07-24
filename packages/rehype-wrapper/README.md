# `@code-blocks/rehype-wrapper`

A wrapper to create a [rehype](https://unifiedjs.com/explore/package/rehype/) transformer from  `code-blocks`.

## Usage

```
const rehypeWrapper = require('@code-blocks/rehype-wrapper')
const charts = require('@code-blocks/charts')

const transformer = rehypeWrapper(charts.default, charts.acceptedLanguages)
```
