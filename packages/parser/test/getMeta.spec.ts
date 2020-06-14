import test from 'ava'
import getMeta from '../src/getMeta'

const stringContent = `
  Hello world
`

const jsonContent = `{
  "message": "hello world"
}`

const expectedMeta = {
  test: 'yes',
  num: 1,
  bool: true,
}

const withFM = (content: string) => `
---
test: yes
num: 1
bool: true
---
${content}
`

const withEmptyFM = (content: string) => `
---
---
${content}
`

const withoutFM = (content: string) => `
${content}
`

test('parser getMeta', t => {
  t.deepEqual(getMeta(withFM(stringContent)).meta, expectedMeta)
  t.deepEqual(getMeta(withFM(jsonContent)).meta, expectedMeta)

  t.deepEqual(getMeta(withEmptyFM(stringContent)).meta, {})
  t.deepEqual(getMeta(withEmptyFM(jsonContent)).meta, {})

  t.deepEqual(getMeta(withoutFM(stringContent)).meta, {})
  t.deepEqual(getMeta(withoutFM(jsonContent)).meta, {})
})