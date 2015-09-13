import inquirer from 'inquirer'
import crypto from 'crypto'
import fs from 'fs'
import mkdirp from 'mkdirp'
import isGitRepo from 'is-git-repo'
import gitConfig from 'git-scope-config'

export default function init(spec) {

  function run() {
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'input',
          name: 'authorName',
          message: 'Your name',
          default: function() {
            var done = this.async()
            gitConfig({scope: 'global'}).get('user.name', (err, name) => {
              if (err) {
                return done()
              }
              name = name.replace(/(\r\n|\n|\r)/gm, '')
              done(name)
            })
          }
        },
        {
          type: 'input',
          name: 'authorEmail',
          message: 'Your email',
          default: function() {
            const done = this.async()
            gitConfig({scope: 'global'}).get('user.email', (err, email) => {
              if (err) {
                return done()
              }
              email = email.replace(/(\r\n|\n|\r)/gm, '')
              done(email)
            })
          }
        },
        {
          type: 'input',
          name: 'projectName',
          message: 'Name of the project',
          default: 'awesome-api'
        },
        {
          type: 'input',
          name: 'projectDescription',
          message: 'Description of your project',
          default: 'A RESTful API'
        },
        {
          type: 'prompt',
          name: 'git',
          message: 'Do you wanna use GIT?',
          default: true
        },
        {
          type: 'input',
          name: 'gitURL',
          message: 'Repository URL',
          when: (answers) => {
            return answers.git
          },
          default: function() {
            const done = this.async()
            isGitRepo(process.cwd(), isGit => {
              if (!isGit) {
                return done()
              }

              gitConfig({scope: 'local'}).get('remote.origin.url', (err, url) => {
                if (err) {
                  return done()
                }
                url = url.replace(/(\r\n|\n|\r)/gm, '')
                done(url)
              })
            })
          }
        },
        {
          type: 'confirm',
          name: 'authentication',
          message: 'Need authentication?',
          default: true
        },
        {
          type: 'confirm',
          name: 'authenticationFacebook',
          message: 'Allow Sign In with Facebook?',
          default: true,
          when: answers => answers.authentication
        },
        {
          type: 'input',
          name: 'facebookClientId',
          message: 'Client ID of your Facebook app',
          when: answers => answers.authenticationFacebook
        },
        {
          type: 'password',
          name: 'facebookClientSecret',
          message: 'Client Secret of your Facebook app',
          when: answers => answers.authenticationFacebook
        },
        {
          type: 'input',
          name: 'secret',
          message: 'Your API secret',
          default: crypto.randomBytes(16).toString('hex')
        },
        {
          type: 'confirm',
          name: 'persistence',
          message: 'Need peristance?',
          default: true
        },
        {
          type: 'list',
          name: 'database',
          choices: ['PostgreSQL', 'MySQL', 'MongoDB', 'Memory'],
          message: 'Choose a database',
          default: 'Memory',
          when: answers => {
            return answers.persistence
          }
        },
        {
          type: 'input',
          name: 'databaseHost',
          message: 'Database host',
          default: 'localhost',
          when: answers => {
            if (!answers.persistence) {
              return false
            }
            if (answers.database === 'Memory') {
              return false
            }
            return true
          }
        },
        {
          type: 'input',
          name: 'databasePort',
          message: 'Database port',
          default: answers => {
            if (answers.database === 'PostgreSQL') {
              return 5432
            }
            if (answers.database === 'MySQL') {
              return 3306
            }
            if (answers.database === 'MongoDB') {
              return 27017
            }
            return 10000
          },
          when: answers => {
            if (!answers.persistence) {
              return false
            }

            if (answers.database === 'Memory') {
              return false
            }
            return true
          }
        },
        {
          type: 'input',
          name: 'databaseUsername',
          message: 'Database username',
          default: 'netiam',
          when: answers => {
            if (answers.database === 'PostgreSQL') {
              return true
            }
            if (answers.database === 'MySQL') {
              return true
            }
            return false
          }
        },
        {
          type: 'password',
          name: 'databasePassword',
          message: 'Database password',
          when: answers => {
            if (answers.database === 'PostgreSQL') {
              return true
            }
            if (answers.database === 'MySQL') {
              return true
            }
            return false
          }
        },
        {
          type: 'input',
          name: 'port',
          message: 'Server port',
          default: 3000
        },
        {
          type: 'checkbox',
          name: 'features',
          message: 'Enable middleware and features',
          choices: [
            {
              name: 'Compression (e.g. GZIP)',
              value: 'compression'
            },
            {
              name: 'Reverse Proxy (e.g. nginx)',
              value: 'proxy'
            },
            {
              name: 'Cluster',
              value: 'cluster'
            },
            {
              name: 'CORS',
              value: 'cors'
            },
            {
              name: 'ACL',
              value: 'acl'
            },
            {
              name: 'JSONAPI',
              value: 'jsonapi'
            },
            {
              name: 'Documentation',
              value: 'documentation'
            },
            {
              name: 'Dockerfile',
              value: 'dockerfile'
            },
          ],
          default: [
            'compression',
            'proxy',
            'cors',
            'documentation'
          ]
        }
      ], answers => {
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
          config.git = {
            url: answers.gitURL
          }
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
          }
        }

        resolve()
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
