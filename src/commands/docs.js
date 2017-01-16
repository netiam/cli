import apidoc from 'apidoc'
import path from 'path'

const DEFAULT_TEMPLATE = path.join(__dirname, '../blueprints/docs/files')

export default function({ui}) {

  function run(opts) {
    ui.writeLine('Generate docs…')

    //const [template] = opts.template
    console.log(opts)
    const [dest] = opts.argv.remain
    if (!dest) {
      return Promise.reject(new Error('You must provide a output path.'))
    }

    const config = {
      template
    }
    apidoc.createDoc(config)
    return Promise.resolve()
  }

  return Object.freeze({
    name: 'docs',
    works: 'everywhere',
    description: 'Generates API documentation',
    aliases: ['d'],

    availableOptions: [
      {
        name: 'template',
        type: String,
        default: DEFAULT_TEMPLATE,
        aliases: ['t']
      }
    ],

    anonymousOptions: [
      '<path>'
    ],

    run
  })
}
