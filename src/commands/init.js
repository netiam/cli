import _ from 'lodash'
import async from 'async'
import inquirer from 'inquirer'
import mkdirp from 'mkdirp'
import dot from 'dot'
import glob from 'glob'
import fs from 'fs'
import path from 'path'
import initPrompt from './init/prompt'
import initDefaults from './init/defaults'

dot.templateSettings.strip = false

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
          const basedir = path.resolve(__dirname, '../../src/blueprints/app/files')
          const blueprintDir = path.join(basedir, '**')
          const opts = {
            dot: true,
            nodir: true
          }
          glob(blueprintDir, opts, (err, files) => {
            async.each(files, (file, done) => {
              const tpl = dot.template(fs.readFileSync(file))
              const compiled = tpl(config)
              const filepath = path.relative(basedir, file)

              mkdirp(path.dirname(path.resolve(process.cwd(), filepath)), err => {
                if (err) {
                  return done(err)
                }
                fs.writeFileSync(filepath, compiled)
                done()
              })
            }, err => {
              if (err) {
                return reject(err)
              }

              resolve()
            })
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
