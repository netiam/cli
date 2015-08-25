export default function version(spec) {

  function run() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  return Object.freeze({
    name: 'version',
    works: 'everywhere',
    description: 'Outputs netiam-cli version.',
    aliases: ['v', 'version', '-v', '--version'],

    availableOptions: [
      {
        name: 'verbose',
        type: Boolean,
        default: false,
        aliases: ['v']
      }
    ],

    anonymousOptions: [],

    run
  })
}
