#!/usr/bin/env node
'use strict'

process.title = 'netiam'

const resolve = require('resolve')
const exit = require('exit')

let cli
try {
  const projectLocalCli = resolve.sync('netiam-cli', {basedir: process.cwd()})
  cli = require(projectLocalCli)
} catch (err) {
  cli = require('../src/lib/index')
}

const exec = cli({
  cliArgs: process.argv.slice(2),
  inputStream: process.stdin,
  outputStream: process.stdout
})

exec
  .then(result => {
    const exitCode = typeof result === 'object' ? result.exitCode : result
    exit(exitCode)
  })
  .catch(err => {
    console.error(err)
  })
