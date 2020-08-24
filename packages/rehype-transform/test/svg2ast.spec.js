const test = require('ava')
const svg2ast = require('../lib/svg2ast')

const svg = '<div class="chart"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg></div>'
const expectedSvgProperties = { viewBox: '0 0 100 100' }
const expectedCircleProperties = {
  cx: '50',
  cy: '50',
  r: '50',
}

const code = '<pre><code>some code</code></pre>'

test('rehype-wrapper svg2ast', t => {
  const { properties, children } = svg2ast(svg)
  t.true(properties.className.includes('chart'))
  t.deepEqual(children[0].properties, expectedSvgProperties)
  t.true(children[0].children[0].tagName === 'circle')
  t.deepEqual(children[0].children[0].properties, expectedCircleProperties)
})

test('rehype-wrapper svg2ast with code block', t => {
  const { children } = svg2ast(code)
  t.is(children[0].tagName, 'pre')
})