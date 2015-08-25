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

  function run() {
    return new Promise((resolve, reject) => {
      let cmd

      if (args.length === 0) {
        cmd = help
      } else if (commands.hasOwnProperty(args[0])) {
        cmd = commands[args[0]]
      } else {
        return reject(new Error('Invalid command'))
      }

      cmd({
        ui,
        inputStream,
        outputStream
      })
        .run(args.slice(1))
        .then(resolve)
        .catch(reject)
    })
  }

  return Object.freeze({
    run
  })

}
