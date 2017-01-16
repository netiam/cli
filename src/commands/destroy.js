export default function destroy(spec) {

  function run() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  return Object.freeze({
    name: 'destroy',
    works: 'insideProject',
    description: 'Destroys files created by `generate` command.',
    aliases: ['d'],

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
