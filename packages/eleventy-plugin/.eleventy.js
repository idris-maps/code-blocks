const codeblocks = require('./dist').default

module.exports = function(renderers) {
  const _renderers = renderers.map(d => d.default ? d.default : d)
  return function(eleventyConfig) {
    eleventyConfig.addTransform('codeblocks-eleventy-plugin', codeblocks(_renderers))
  }
}