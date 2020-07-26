import { JSDOM } from 'jsdom'
import createPage from './createPage'

const replace = (toRemove: string, toAdd: string) =>
  (string: string) =>
    string.split(toRemove).join(toAdd)

export default async (abc: string) => {
  const tune = replace('&quot;', '"')(abc)
  const page = await createPage()
  const dom = new JSDOM(page, { runScripts: 'dangerously' })

  dom.window.ABCJS.renderAbc('paper', tune)
  const div = dom.window.document.body.getElementsByTagName('div')[0]

  // remove font-family
  Array.from(div.getElementsByTagName('text'))
    .forEach(d => d.removeAttribute('font-family'))

  // set viewBox
  const svg = div.getElementsByTagName('svg')[0]
  const width = svg.getAttribute('width')
  const height = svg.getAttribute('height')
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  svg.removeAttribute('width')
  svg.removeAttribute('height')
  
  return div.innerHTML
}