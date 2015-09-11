import _ from 'lodash'
import chalk from 'chalk'
import commands from './index'
import pkg from '../../package.json'

export default function(spec) {
  const {ui} = spec

  function run() {
    ui.writeLine('Available commands in netiam-cli')
    ui.writeLine('Version: ' + (pkg.version || '1.0.0-semantically-released'))
    ui.writeLine('')

    _.forEach(commands, command => {
      const cmd = command()
      ui.write('netiam ' + cmd.name)
      if (cmd.anonymousOptions.length > 0) {
        ui.write(' ' + chalk.yellow(cmd.anonymousOptions.join(' ')))
      }
      if (cmd.availableOptions.length > 0) {
        ui.write(chalk.cyan(' <options…>'))
      }
      ui.writeLine('')

      ui.writeLine('  ' + cmd.description)
      ui.writeLine('  ' + chalk.gray('aliases: ' + cmd.aliases.join(', ')))

      if (cmd.availableOptions.length > 0) {
        _.forEach(cmd.availableOptions, option => {
          ui.writeLine('  ' + chalk.cyan('--' + option.name + ' (' + option.type.name + ') (Default: ' + option.default + ')'))
          ui.writeLine('    ' + chalk.gray('aliases: ' + option.aliases.join(', ')))
        })
      }
    })
  }

  return Object.freeze({
    name: 'help',
    works: 'everywhere',
    description: 'Prints this help',
    aliases: ['h'],

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
