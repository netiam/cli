#!/usr/bin/env node
'use strict'

process.title = 'netiam'

const resolve = require('resolve')
const exit = require('exit')

resolve('netiam-cli', {
  basedir: process.cwd()
}, (err, projectLocalCli) => {
  let cli

  if (err) {
    cli = require('../lib/cli')
  } else {
    cli = require(projectLocalCli)
  }

  cli({
    cliArgs: process.argv.slice(2),
    inputStream: process.stdin,
    outputStream: process.stdout
  })
    .then(result => {
      var exitCode = typeof result === 'object' ? result.exitCode : result
      exit(exitCode)
    })
    .catch(err => {
      console.error(err)
      console.error(err.stack)
    })

})
