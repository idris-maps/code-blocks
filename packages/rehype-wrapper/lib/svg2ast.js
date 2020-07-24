'use-strict'

const parse5 = require('parse5')
const fromParse5 = require('hast-util-from-parse5')

const findChildByTag = (tag, children) =>
  children.find(({ tagName }) => tagName === tag)

const getChildrenOf = (tag, children) => {
  const node = findChildByTag(tag, children)
  return node && node.children ? node.children : []
}

const getPropertiesOf = (tag, children) => {
  const node = findChildByTag(tag, children)
  return node && node.properties ? node.properties : {}
}

const extractDiv = page => {
  const rootChildren = page && page.children ? page.children : []
  const inHtml = getChildrenOf('html', rootChildren)
  const inBody = getChildrenOf('body', inHtml)
  return {
    properties: getPropertiesOf('div', inBody),
    children: getChildrenOf('div', inBody),
  }
}

module.exports = svg =>
  extractDiv(
    fromParse5(
      parse5.parse(
        svg
      )
    )
  )