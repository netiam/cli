import pkg from '../../package.json'

export default function version({ui}) {

  function run() {
    ui.writeLine(`You are running ${pkg.version || '1.0.0-semantically-released'}`)
    return Promise.resolve()
  }

  return Object.freeze({
    name: 'version',
    works: 'everywhere',
    description: 'Prints netiam-cli version.',
    aliases: ['v', 'version', '-v', '--version'],

    availableOptions: [],

    anonymousOptions: [],

    run
  })
}
