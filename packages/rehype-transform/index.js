const visit = require('unist-util-visit')
const nodeToString = require('hast-util-to-string')
const svg2ast = require('./lib/svg2ast')

module.exports = (renderers) => {

  validateRenderers(renderers)

  return async (tree) => {
    let promises = []
    visit(tree, 'element', visitor)
    await Promise.all(promises)
    return null

    function visitor(node, index, parent) {
      if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
        return
      }

      const lang = getLanguage(node)
      const renderer = getRenderer(renderers, lang)
      if (!renderer) {
        return
      }

      try {
        const p = renderer({
          type: 'code',
          language: lang,
          content: nodeToString(node),
        })
          .then(({ content }) => svg2ast(content))
          .then(({ properties, children }) => {
            parent.tagName = 'div'
            parent.properties = properties
            parent.children = children
          })
        promises.push(p)
        return true
      } catch (err) {
        return
      }
    }
  }
}

function getLanguage(node) {
  const className = node.properties.className || []

  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9).toLowerCase()
    }
  }

  return null
}

function validateRenderers(renderers) {
  if(!Array.isArray(renderers)) {
    throw new Error(`
      codeblocks must have an array of renderers
      
      https://github.com/idris-maps/code-blocks/tree/master/packages/rehype-transform
    `)
  }

  for (let i = 0; i < renderers.length; i++) {
    const d = renderers[i]
    if (!d.default || !d.acceptedLanguages || !Array.isArray(d.acceptedLanguages)) {
      throw new Error(`
        renderer[${i}] is invalid
      `)
    }
  }
}

function getRenderer(renderers, lang) {
  const hasLanguageArray = d =>
    d.acceptedLanguages
    && Array.isArray(d.acceptedLanguages)

  const found = renderers.find(d => hasLanguageArray(d) && d.acceptedLanguages.includes(lang))

  return found
    ? found.default([lang])
    : undefined
}