const refractor = require('refractor')

console.log(`
const languages: string[] = ${JSON.stringify(refractor.listLanguages())}

export default languages
`
  )