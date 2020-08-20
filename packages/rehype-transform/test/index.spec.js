const test = require('ava')
const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')
const plugin = require('../index')
const charts = require('@code-blocks/charts')

const md = `
\`\`\`pie-chart
Fruit,Amount
Banana,2
Apple,1
\`\`\`
`

const runWithOption = options => {
  const process = md =>
    new Promise((resolve, reject) =>
      unified()
        .use(markdown)
        .use(remark2rehype)
        .use(plugin, options)
        .use(html)
        .process(md, (err, file) => err ? reject(err) : resolve(file.contents))
    )
  
  return process(md)
}

test('without options', async t => {
  try {
    await runWithOption()
    t.fail('should throw error')
  } catch (err) {
    t.pass('should throw error')
  }
})

test('with an invalid renderer', async t => {
  try {
    await runWithOption(['Not a renderer'])
    t.fail('should throw error')
  } catch (err) {
    t.pass('should throw error')
  }
})

test('with a renderer', async t => {
  try {
    const result = await runWithOption([charts])
    t.true(result.includes('<svg'), 'should return an svg')
  } catch (err) {
    t.fail('should return an svg')
  }
})