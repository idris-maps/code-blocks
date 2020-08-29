---
layout: layout.njk
title: "@code-blocks"
description: "Use markdown code blocks to render, charts, diagrams, math, music sheets and HTML tables"
---

Use markdown code blocks to render:

* [Charts](/charts) 
* [Graphviz diagrams](/graphviz)
* [MathML](/math)
* [Music sheets](/music)
* [HTML tables](/tables)

and [highlight code](/prism).

`@code-blocks` can be used either as a [rehype](https://github.com/rehypejs/rehype) transform or as an [eleventy](https://www.11ty.dev/) plugin.

## Example

A code block with `music-abc` as language and the following content:

```
DDAA|BBA2|
```

will be rendered as:

```music-abc
DDAA|BBA2|
```

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
