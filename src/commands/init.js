import _ from 'lodash'
import inquirer from 'inquirer'
import dot from 'dot'
import glob from 'glob'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import isGitRepo from 'is-git-repo'
import initPrompt from './init/prompt'

export default function init(spec) {

  function run() {
    return new Promise((resolve, reject) => {
      inquirer.prompt(initPrompt, answers => {
        const config = {
          author: {
            name: answers.authorName,
            email: answers.authorEmail
          },
          project: {
            name: answers.projectName,
            description: answers.projectDescription
          },
          secret: answers.secret,
          server: {
            port: answers.port
          },
          features: answers.features
        }

        if (answers.git) {
          config.git = {url: answers.gitURL}
        }

        if (answers.authentication) {
          config.auth = {}
          if (answers.authenticationFacebook) {
            config.auth.fb = {
              clientId: answers.facebookClientId,
              clientSecret: answers.facebookClientSecret
            }
          }
        }

        if (answers.persistence) {
          config.db = {
            type: answers.database
          }

          if (answers.database === 'PostgreSQL' || answers.database === 'MySQL') {
            config.db.username = answers.databaseUsername
            config.db.password = answers.databasePassword
          }

          if (answers.database === 'PostgreSQL' || answers.database === 'MySQL' || answers.database === 'MongoDB') {
            config.db.host = answers.databaseHost
            config.db.port = answers.databasePort
            config.db.name = answers.databaseName
          }
        }

        // render templates from blueprint
        const blueprintDir = path.resolve(
          __dirname,
          '../../src/blueprints/app/files',
          '**')
        glob(blueprintDir, {nodir: true}, (err, files) => {
          _.forEach(files, file => {
            const tpl = dot.template(fs.readFileSync(file))
            const compiled = tpl(config)
            console.log(file)
            console.log(compiled)
          })
          resolve()
        })
      })
    })
  }

  return Object.freeze({
    name: 'init',
    works: 'insideProject',
    description: 'Creates a new netiam-cli project in the current folder.',
    aliases: ['i'],

    availableOptions: [
      {
        name: 'verbose',
        type: Boolean,
        default: false,
        aliases: ['v']
      }
    ],

    anonymousOptions: [
      '<glob-pattern>'
    ],

    run
  })

}
