import test from 'ava'
import renderer, { acceptedLanguages } from '../src/index'

test('graphviz renderer', async t => {
  const { type, content } = await renderer(acceptedLanguages)({
    type: 'code',
    language: acceptedLanguages[0],
    content: 'digraph { a -> b }',
  })
  t.is(type, 'other')
  t.is(typeof content, 'string')
  t.true(content.startsWith('<svg'))
})