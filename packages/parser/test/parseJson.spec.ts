import test from 'ava'
import parseJson from '../src/parseJson'

const json = `{"hello":"world"}`
const withQuotes = `{&quot;hello&quot;:&quot;world&quot;}`
const withBackslash = `{\"hello\":\"world\"}`
const expected = { hello: 'world' }
const notJson = 'Hello world'

test('parser parseJson', t => {
  t.deepEqual(parseJson(json), expected)
  t.deepEqual(parseJson(withQuotes), expected)
  t.deepEqual(parseJson(withBackslash), expected)
  try {
    parseJson(notJson)
    t.fail('Should throw error if not json')
  } catch (err) {
    t.pass()
  }
})