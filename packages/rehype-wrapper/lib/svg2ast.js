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

const findSvg = page => {
  const rootChildren = page && page.children ? page.children : []
  const inHtml = getChildrenOf('html', rootChildren)
  const inBody = getChildrenOf('body', inHtml)
  // svg may be wrapped in a div
  const svg = findChildByTag('svg', inBody)
  if (svg) {
    return svg
  }
  const inDiv = getChildrenOf('div', inHtml)

}

const extractSvg = page => {
  const rootChildren = page && page.children ? page.children : []
  const inHtml = getChildrenOf('html', rootChildren)
  const inBody = getChildrenOf('body', inHtml)
  // svg may be wrapped in a div
  const svg = findChildByTag('svg', inBody)
  if (svg) {
    return {
      properties: getPropertiesOf('svg', inBody),
      children: getChildrenOf('svg', inBody),
    }
  }
  const inDiv = getChildrenOf('div', inBody)
  return {
    properties: getPropertiesOf('svg', inDiv),
    children: getChildrenOf('svg', inDiv),
  }
}

module.exports = svg =>
  extractSvg(
    fromParse5(
      parse5.parse(
        svg
      )
    )
  )