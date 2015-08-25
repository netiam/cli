import commands from '../commands'
import uit from '../ui'

export default function cli(spec) {
  const args = spec.cliArgs
  const inputStream = spec.inputStream
  const outputStream = spec.outputStream
  const ui = uit({
    inputStream,
    outputStream
  })

  if (args.length === 0) {
    args.push('help')
  }

  const cmd = args[0]

  if (!commands.hasOwnProperty(cmd)) {
    throw new Error('Invalid command')
  }

  function run() {
    return new Promise((resolve, reject) => {
      commands[cmd]({
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
