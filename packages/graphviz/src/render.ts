import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render.js'
import { parseFragment, serialize } from 'parse5'

interface Node {
  nodeName: string
  [key: string]: any
}

const isNode = (d: any): d is Node =>
  Object.keys(d).includes('nodeName')

const findSvg = (node: Node) =>
  (node.childNodes || []).find((d: Node) => d.nodeName === 'svg')

const removeTextNodes = (node: Node): Node => {
  if (node.childNodes && Array.isArray(node.childNodes)) {
    return {
      ...node,
      childNodes: node.childNodes.filter(d => d.value !== '\n').map(removeTextNodes)
    }
  }
  return node
}

const removeSize = (node: Node): Node => {
  if (node.attrs && Array.isArray(node.attrs)) {
    return {
      ...node,
      attrs: node.attrs.filter((d: any) => !['width', 'height'].includes(d.name))
    }
  }
  return node
}

const addParent = (node: Node) => ({
  nodeName: 'parent',
  childNodes: [node],
})

const fixSvg = (node: Node): string =>
  // @ts-ignore
  serialize(
    addParent(
      removeTextNodes(
        removeSize(
          findSvg(node)
        )
      )
    )
  )

export default async (data: string, options?: any) => {
  const viz = new Viz({ Module, render })
  const svg = await viz.renderString(data, options)
  const node = parseFragment(svg)
  if (isNode(node)) {
    return fixSvg(node)
  }
  return svg
}
