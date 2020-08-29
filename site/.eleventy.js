const cleanCSS = require('clean-css')

const codeblocks = require('@code-blocks/eleventy-plugin')

const charts = require('@code-blocks/charts')
const graphviz = require('@code-blocks/graphviz')
const highlight = require('@code-blocks/prism')
const math = require('@code-blocks/math')
const music = require('@code-blocks/music')
const tables = require('@code-blocks/tables')

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('cssmin', function(code) {
    return new cleanCSS({}).minify(code).styles
  })

  eleventyConfig.addPlugin(codeblocks([
    charts,
    graphviz,
    highlight,
    math,
    music,
    tables,
  ]))
}