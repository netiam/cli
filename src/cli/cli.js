import _ from 'lodash'
import nopt from 'nopt'
import commands from '../commands'
import help from '../commands/help'
import uit from '../ui'

export default function cli(spec) {
  const args = spec.cliArgs
  const inputStream = spec.inputStream
  const outputStream = spec.outputStream
  const ui = uit({
    inputStream,
    outputStream
  })

  function findCommand(name) {
    // direct match
    if (commands.hasOwnProperty(name)) {
      return commands[name]
    }

    // alias search
    return _.find(commands, command => {
      const cmd = command({ui})
      return cmd.aliases.includes(name)
    })
  }

  function run() {
    let cmd

    if (findCommand(args[0])) {
      cmd = findCommand(args[0])
    } else {
      cmd = help
    }

    const c = cmd({
      ui,
      inputStream,
      outputStream
    })

    const parsedOptions = nopt(
      c.availableOptions,
      {},
      process.argv,
      3)

    return c.run(parsedOptions)
  }

  return Object.freeze({
    run
  })

}
