import { pipe, trim } from 'ramda'

export const replace = (toRemove: string, toAdd: string) =>
  (string: string) =>
    string.split(toRemove).join(toAdd)

export default <T = any>(content: string): T =>
  pipe(trim, replace('&quot;', '"'), JSON.parse)(content)
