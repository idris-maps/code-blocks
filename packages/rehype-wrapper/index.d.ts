import { Renderer } from '@code-blocks/types'
import { Root } from 'mdast'
import { Transformer } from 'unified'
declare const _default: (renderer: Renderer, languages: string[]) => (tree: Root) => Promise<Transformer> 
export default _default;