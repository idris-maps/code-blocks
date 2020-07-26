import { readFile } from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'

const template = (lib: string) => `
  <html>
    <body>
      <div id="paper"></div>
      <script>${lib}</script>
    </body>
  </html>
`

export default async () => { 
  const lib = await promisify(readFile)(resolve(__dirname, 'assets', 'abc.js'), 'utf-8')
  return template(lib)
}