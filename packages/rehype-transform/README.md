# @code-blocks/rehype-transform

A rehype transform to render code blocks

## Usage

Install the transform:

```bash
npm install @code-blocks/rehype-transform --save
```

Install the renderers you need, for example:

```bash
npm install @code-blocks/charts --save
```

An use it:

```js
const unified = require('unified')
const stream = require('unified-stream')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')

// the rehype transform
const codeblocks = require('@code-blocks/rehype-transform')

// some renderers
const charts = require('@code-blocks/charts')
const graphviz = require('@code-blocks/graphviz')

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  // add the transform and the renderers in an array as options
  .use(codeblocks, [charts, graphviz])
  .use(html)

process.stdin.pipe(stream(processor)).pipe(process.stdout)
```

Available renderers:

* [@code-blocks/charts](https://github.com/idris-maps/code-blocks/tree/master/packages/charts)
* [@code-blocks/graphviz](https://github.com/idris-maps/code-blocks/tree/master/packages/graphviz)
* [@code-blocks/math](https://github.com/idris-maps/code-blocks/tree/master/packages/math)
* [@code-blocks/music](https://github.com/idris-maps/code-blocks/tree/master/packages/music)
* [@code-blocks/tables](https://github.com/idris-maps/code-blocks/tree/master/packages/tables)
* [@code-blocks/prism](https://github.com/idris-maps/code-blocks/tree/master/packages/prism)