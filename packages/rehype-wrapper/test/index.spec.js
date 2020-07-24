const test = require('ava')
const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')
const wrapper = require('../index')
const { default: chartRenderer, acceptedLanguages } = require('@code-blocks/charts')

const md = `
\`\`\`pie-chart
Fruit,Amount
Banana,2
Apple,1
\`\`\`
`

const plugin = wrapper(chartRenderer, acceptedLanguages)

const process = md =>
  new Promise((resolve, reject) =>
    unified()
      .use(markdown)
      .use(remark2rehype)
      .use(plugin)
      .use(html)
      .process(md, (err, file) => err ? reject(err) : resolve(file.contents))
  )

test('rehype-wrapper', async t => {
  const result = await process(md)
  t.true(result.includes('<svg'))
})
