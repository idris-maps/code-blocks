import test from 'ava'
import parseDsv from '../src/parseDsv'

const head = ['Foo', 'Bar', 'Baz']
const body = [
  ['Hello', 1, true],
  ['World', 2, false],
]

const expected = [
  { 'Foo': 'Hello', 'Bar': 1, 'Baz': true },
  { 'Foo': 'World', 'Bar': 2, 'Baz': false },
]

const toString = (separator: string, data: any[][]): string =>
  data.map(line => line.join(separator)).join('\n')

const csv = toString(',', [head, ...body])
const tsv = toString('\t', [head, ...body])
const semicolonSeparatedValues = toString(';', [head, ...body])
const notDsv = 'Not a dsv'

test('parser parseDsv', t => {
  t.deepEqual(parseDsv(',')(csv), expected)
  t.deepEqual(parseDsv('\t')(tsv), expected)
  t.deepEqual(parseDsv(';')(semicolonSeparatedValues), expected)
  try {
    parseDsv(',')(notDsv)
    t.fail()
  } catch (err) {
    t.pass()
  }
})