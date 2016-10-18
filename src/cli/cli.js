import nopt from 'nopt'
import commands from '../commands'
import help from '../commands/help'
import _ from 'lodash'
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
    return new Promise((resolve, reject) => {
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

      c
        .run(parsedOptions)
        .then(resolve)
        .catch(reject)
    })
  }

  return Object.freeze({
    run
  })

}
