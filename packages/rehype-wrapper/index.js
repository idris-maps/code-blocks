const visit = require('unist-util-visit')
const nodeToString = require('hast-util-to-string')
const svg2ast = require('./lib/svg2ast')

module.exports = (renderer, languages) => () => {

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
      if (!languages.includes(lang)) {
        return
      }

      try {
        const p = renderer(languages)({
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
