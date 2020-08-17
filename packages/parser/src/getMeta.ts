import frontmatter from 'front-matter'
import { Meta } from '@code-blocks/types'

export default <T = Meta>(codeblock: string) => {
  const { attributes, body } = frontmatter<T>(codeblock.trim())
  return {
    meta: attributes,
    content: body.trim(),
  }
}
