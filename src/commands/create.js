import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import init from '../commands/init'

export default function create(spec) {
  const {ui} = spec

  function run(args) {
    return new Promise((resolve, reject) => {
      const name = args.argv.cooked.shift()

      if (!name) {
        return reject(new Error(`Invalid project name "${name}"`))
      }

      const cwd = process.cwd()
      const projectDir = path.resolve(cwd, name)
      let stats
      try {
        stats = fs.statSync(projectDir)
      } catch (err) {
        /* noop */
      }

      if (stats && stats.isDirectory()) {
        return reject(new Error(`Directory exists "${projectDir}"`))
      }

      mkdirp.sync(projectDir)
      process.chdir(projectDir)

      // call init
      init(spec)
        .run(args)
        .then(resolve)
        .catch(reject)
    })
  }

  return Object.freeze({
    name: 'create',
    works: 'outsideProject',
    description: 'Creates a new directory and runs ' + chalk.green('netiam init') + ' in it.',
    aliases: ['c'],

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
