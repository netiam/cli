import inquirer from 'inquirer'
import mkdirp from 'mkdirp'
import dot from 'dot'
import glob from 'glob'
import fs from 'fs'
import path from 'path'
import questions from './init/questions'
import defaults from './init/defaults'

dot.templateSettings.strip = false

const BLUEPRINTS_DIR = path.resolve(__dirname, '../blueprints')

export default function init({} = {}) {

  function run() {
    return inquirer
      .prompt(questions)
      .then(answers => {
        const config = Object.assign({}, defaults)

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

        if (answers.authentication && answers.authenticationFacebook) {
          config.auth.fb.clientId = answers.facebookClientId
          config.auth.fb.clientSecret = answers.facebookClientSecret
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
        const basedir = path.resolve(BLUEPRINTS_DIR, 'app/files/')
        const opts = {
          absolute: true,
          cwd: basedir,
          dot: true,
          nodir: true
        }

        try {
          const files = glob.sync('**', opts)
          files.forEach(file => {
            const tpl = dot.template(fs.readFileSync(file))
            const compiled = tpl(config)
            const filepath = path.relative(basedir, file)
            const target = path.resolve(process.cwd(), filepath)

            mkdirp.sync(path.dirname(target))
            fs.writeFileSync(target, compiled)
          })
        } catch (err) {
          return Promise.reject(err)
        }
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
      '<path>'
    ],

    run
  })

}
