# @code-blocks/eleventy-plugin

An eleventy plugin to parse code blocks

## Usage

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

Available renderers:

* [@code-blocks/charts](https://github.com/idris-maps/code-blocks/tree/master/packages/charts)
* [@code-blocks/graphviz](https://github.com/idris-maps/code-blocks/tree/master/packages/graphviz)
* [@code-blocks/math](https://github.com/idris-maps/code-blocks/tree/master/packages/math)
* [@code-blocks/music](https://github.com/idris-maps/code-blocks/tree/master/packages/music)
* [@code-blocks/tables](https://github.com/idris-maps/code-blocks/tree/master/packages/tables)
* [@code-blocks/prism](https://github.com/idris-maps/code-blocks/tree/master/packages/prism)

There is already an official syntax [highlighting plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/) for eleventy. If you are just going to highlight code blocks, use that instead. However, if you are using other `@code-blocks` renderers, it will break the official plugin. That is why there is a `@code-blocks/prism` renderer.
