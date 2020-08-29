import test from 'ava'
import renderer, { acceptedLanguages } from '../src/index'

const content = `
1 + 1 = 2
`

const contentWithOptions = `
---
className: test
dir: rtl
---
1 + 1 = 2
`

const render = (content: string) => renderer(acceptedLanguages)({
  type: 'code',
  language: acceptedLanguages[0],
  content,
})

test('mathup renderer', async t => {
  const withoutOptions = await render(content)
  t.is(withoutOptions.type, 'other')
  t.is(typeof withoutOptions.content, 'string')
  t.true(withoutOptions.content.includes('<math'))

  const withOptions = await render(contentWithOptions)
  t.is(withOptions.type, 'other')
  t.true(withOptions.content.includes('class="test"'))
  t.true(withOptions.content.includes('dir="rtl"'))
})