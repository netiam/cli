import inquirer from 'inquirer'
import PleasantProgress from 'pleasant-progress'
import readline from 'readline2'
import through from 'through'
import {EOL} from 'os'

export const DEBUG = 1
export const INFO = 2
export const WARNING = 3
export const ERROR = 4

export default function ui(spec) {
  const pleasantProgress = new PleasantProgress()
  const actualOuputStream = spec.outputStream
  const ci = !!spec.ci

  const outputStream = through(function(data) {
    pleasantProgress.stop(true)
    this.emit('data', data)
  })

  outputStream.setMaxListeners(0)
  outputStream.pipe(actualOuputStream)

  const inputStream = spec.inputStream

  let writeLevel = spec.writeLevel || INFO

  function writeLevelVisible(level) {
    level = level || INFO
    return level >= writeLevel
  }

  function write(data, level = INFO) {
    if (writeLevelVisible(level)) {
      outputStream.write(data)
    }
  }

  function writeLine(data, level = INFO) {
    if (writeLevelVisible(level)) {
      write(data + EOL, level)
    }
  }

  function writeError(err) {
    write(chalk.red(err.message) + EOL + err.stack)
  }

  function setWriteLevel(level) {
    writeLevel = level
  }

  function startProgress(message, stepString) {
    if (writeLevelVisible(INFO)) {
      if (ci) {
        writeLine(message)
      } else {
        pleasantProgress.start(message, stepString)
      }
    }
  }

  function stopProgress(printWithFullStepString) {
    if (writeLevelVisible(INFO) && !ci) {
      pleasantProgress.stop(printWithFullStepString)
    }
  }

  function prompt(questions, done) {
    const promptOutputStream = through(null, () => {
    })
    promptOutputStream.pipe(outputStream)

    const Prompt = promp.ui.Prompt

    function PromptExt() {
      Prompt.apply(this, arguments)
    }

    PromptExt.prototype = Object.create(Prompt.prototype)
    PromptExt.prototype.constructor = PromptExt
    PromptExt.prototype.rl = readline.createInterface({
      input: inputStream,
      output: promtOutputStream
    })

    if (done) {
      return new PromptExt(questions, done)
    } else {
      return new Promise((resolve, reject) => {
        new PromptExt(questions, resolve)
      })
    }
  }

  return Object.freeze({
    prompt,
    setWriteLevel,
    startProgress,
    stopProgress,
    write,
    writeError,
    writeLine
  })
}
