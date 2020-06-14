import frontmatter from 'front-matter'

export interface Meta {
  [key: string]: any
}

export default <T = Meta>(codeblock: string) => {
  const { attributes, body } = frontmatter<T>(codeblock.trim())
  return {
    meta: attributes,
    content: body.trim(),
  }
}