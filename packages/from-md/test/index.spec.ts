import { readFileSync } from 'fs'
import test from 'ava'
import fromMD from '../src/index'

const md = readFileSync(__dirname + '/test.md', 'utf-8')

test('from-md', t => {
  t.is(fromMD(md, ['test']).filter(d => d.type === 'code').length, 1)
  t.is(fromMD(md, '*').filter(d => d.type === 'code').length, 2)
})