import chalk from 'chalk'

export default function create(spec) {
  const {ui} = spec

  function run() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  return Object.freeze({
    name: 'create',
    works: 'outsideProject',
    description: 'Creates a new directory and runs ' + chalk.green('netiam init') + ' in it.',
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
      '<app-name>'
    ],

    run
  })
}
