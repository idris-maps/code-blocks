# `@code-blocks/rehype-charts`

A rehype transformer to add svg charts from code-blocks

## Usage

`try.js`

```js
const unified = require('unified')
const stream = require('unified-stream')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')
const charts = require('./index')

var processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(charts)
  .use(html)

process.stdin.pipe(stream(processor)).pipe(process.stdout)
```

And run with:

```bash
node try < example.md > example.html
```

In your markdown, use codeblocks with one of the following languages:

* `area-chart`
* `bar-chart`
* `line-chart`
* `multiline-chart`
* `pie-chart`
* `vega-lite`
* `vega`
* `vegalite`

[`vega`](https://vega.github.io/vega/) and [`vegalite`](https://vega.github.io/vega-lite/) are json objects.

The others are `csv` with options set as front-matter.

See the [examples markdown](https://raw.githubusercontent.com/idris-maps/eleventy-charts/master/examples.md) and how they are [rendered](http://eleventy-charts.surge.sh/).