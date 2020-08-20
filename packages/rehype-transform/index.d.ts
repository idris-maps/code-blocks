import { Renderer } from '@code-blocks/types'
import { Transformer } from 'unified'
export interface RendererWithLanguages {
  default: Renderer
  acceptedLanguages: string[]
}
declare const _default: (renderers: RendererWithLanguages[]) => (tree: any) => Promise<Transformer> 
export default _default;
