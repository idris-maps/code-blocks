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