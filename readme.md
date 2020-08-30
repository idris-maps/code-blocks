# @code-blocks

Use markdown code blocks to render:

* [Charts](https://github.com/idris-maps/code-blocks/tree/master/packages/charts) 
* [Graphviz diagrams](https://github.com/idris-maps/code-blocks/tree/master/packages/graphviz)
* [MathML](https://github.com/idris-maps/code-blocks/tree/master/packages/math)
* [Music sheets](https://github.com/idris-maps/code-blocks/tree/master/packages/music)
* [HTML tables](https://github.com/idris-maps/code-blocks/tree/master/packages/tables)

and [highlight code](https://github.com/idris-maps/code-blocks/tree/master/packages/prism).

`@code-blocks` can be used either as a [rehype](https://github.com/rehypejs/rehype) transform or as an [eleventy](https://www.11ty.dev/) plugin.

## Example

A code block with `music-abc` as language and the following content:

```
DDAA|BBA2|
```

will be rendered as:

![Music sheet example](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/home-example.png)

## Usage with [rehype](https://github.com/rehypejs/rehype)

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

## Usage with [eleventy](https://www.11ty.dev/)

Install the plugin:

```bash
npm install @code-blocks/eleventy-plugin --save
```

Install the renderers you need, for example:

```bash
npm install @code-blocks/music --save
```


In the `.eleventy.js` configuration file:

```js
// the plugin
const codeblocks = require('@code-blocks/eleventy-plugin')

// some renderers
const math = require('@code-blocks/math')
const music = require('@code-blocks/music')

module.exports = function(eleventyConfig) {
  // pass the renderers to the plugin
  eleventyConfig.addPlugin(codeblocks([
    math,
    music,
  ]))
}
```
