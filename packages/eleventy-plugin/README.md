# `@code-blocks/eleventy-plugin`

An eleventy plugin to parse code blocks

## Usage

In your `.eleventy.js` config file:

```js
const codeblocks = require('@code-blocks/eleventy-plugin')
const charts = require('@code-blocks/charts')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(codeblocks([charts]))
}
```

`codeblocks` takes an array of codeblock parsers. These need to be installed separately.