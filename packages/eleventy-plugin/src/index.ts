import { Renderer, Part, isPartOther, PartCode } from '@code-blocks/types'
import fromHtml from '@code-blocks/from-html'

const loopRenderers = (i: number, renderers: Renderer[], part: Part, cb: (part: Part) => void) => {
  if (isPartOther(part)) { return cb(part) }
  const renderer = renderers[i]
  if (i === renderers.length) { return cb(part) }
  if (!renderer) { return cb(part) }
  renderer('*')(part)
    .then(newPart => loopRenderers(i + 1, renderers, newPart, cb))
    .catch(err => { throw err })
}

const renderPart = (renderers: Renderer[]) =>
  async (part: Part): Promise<Part> =>
    new Promise((resolve, reject) => {
      try {
        loopRenderers(0, renderers, part, renderedPart => resolve(renderedPart))
      } catch (err) {
        throw err
      }
    })  

const stringifyUnrenderedCodeBlock = ({ language, content }: PartCode) =>
`<pre><code class="language-${language}">${content}</code></pre>`

const stringifyPart = (part: Part) =>
    isPartOther(part)
      ? part.content
      : stringifyUnrenderedCodeBlock(part)

export default (renderers: Renderer[]) =>
  async (content: string) => {
    const parts = fromHtml(content, '*')
    return (await Promise.all(parts.map(renderPart(renderers))))
      .map(stringifyPart)
      .join('\n')
  }
