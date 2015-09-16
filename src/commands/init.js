import _ from 'lodash'
import inquirer from 'inquirer'
import dot from 'dot'
import glob from 'glob'
import fs from 'fs'
import path from 'path'
import initPrompt from './init/prompt'
import initDefaults from './init/defaults'

export default function init(spec) {

  function run() {
    return new Promise((resolve, reject) => {
        inquirer.prompt(initPrompt, answers => {
          const config = Object.assign({}, initDefaults)

          config.author.name = answers.authorName
          config.author.email = answers.authorEmail

          config.project.name = answers.projectName
          config.project.description = answers.projectDescription

          config.secret = answers.secret

          config.server.port = answers.port

          config.features = answers.features

          if (answers.git) {
            config.git.url = answers.gitURL
          }

          if (answers.authentication) {
            if (answers.authenticationFacebook) {
              config.auth.fb.clientId = answers.facebookClientId
              config.auth.fb.clientSecret = answers.facebookClientSecret
            }
          }

          if (answers.persistence) {
            config.db.type = answers.database

            if (answers.database === 'PostgreSQL'
              || answers.database === 'MySQL') {
              config.db.username = answers.databaseUsername
              config.db.password = answers.databasePassword
            }

            if (answers.database === 'PostgreSQL'
              || answers.database === 'MySQL'
              || answers.database === 'MongoDB') {
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

      }
    )
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
