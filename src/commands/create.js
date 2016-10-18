import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import init from '../commands/init'

export default function create({ui}) {

  function run(args) {
    const name = args.argv.cooked.shift()

    if (!name) {
      return reject(
        new Error(`Invalid project name "${name}"`))
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
      return reject(
        new Error(`Project directory exists "${projectDir}". Use 'init' instead of 'create'.`))
    }

    mkdirp.sync(projectDir)
    process.chdir(projectDir)

    // call init
    return init().run(args)
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
