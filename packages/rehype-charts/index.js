const rehypeWrapper = require('@code-blocks/rehype-wrapper')
const charts = require('@code-blocks/charts')

module.exports = rehypeWrapper(charts.default, charts.acceptedLanguages)