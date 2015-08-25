export default function generate(spec) {

  function run() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  return Object.freeze({
    name: 'generate',
    works: 'insideProject',
    description: 'Generates new code from blueprints.',
    aliases: ['g'],

    availableOptions: [
      {
        name: 'verbose',
        type: Boolean,
        default: false,
        aliases: ['v']
      }
    ],

    anonymousOptions: [
      '<blueprint>'
    ],

    run
  })
}
