import test from 'ava'
import { Part, isPartCode, isPartOther } from '@code-blocks/types'
import { path } from 'ramda'
import fromHTML from '../src/index'

const inside = `inside code block`

const tagsInOneLine = `
<p>Before</p>
<pre><code class="language-test">
${inside}
</code></pre>
<p>After</p>
`

const allInOneLine = `<p>Before</p><pre><code class="language-test">${inside}</code></pre><p>After</p>`

const onMultipleLines = `
<p>Before</p>
<pre>
  <code class="language-test">
    ${inside}
  </code>
</pre>
<p>After</p>
`

const getFirstCodeBlock = (parts: Part[]) =>
  path<string>(['content'], parts.find(isPartCode))

const otherLanguage = `
<p>Before</p>
<pre><code class="language-other">
${inside}
</code></pre>
<p>After</p>
`

test('fromHTML', t => {
  t.is(getFirstCodeBlock(fromHTML(tagsInOneLine, ['test'])), inside)
  t.is(getFirstCodeBlock(fromHTML(allInOneLine, ['test'])), inside)
  t.is(getFirstCodeBlock(fromHTML(onMultipleLines, ['test'])), inside)

  t.true(
    fromHTML(otherLanguage, ['test']).every(isPartOther),
    'should ignore not defined languages'
  )
  t.is(
    getFirstCodeBlock(fromHTML(otherLanguage, '*')),
    inside,
    'should parse if languages set to all'
  )
})