import inquirer from 'inquirer'
import crypto from 'crypto'
import fs from 'fs'
import mkdirp from 'mkdirp'

export default function init(spec) {

  function run() {
    return new Promise((resolve, reject) => {
      inquirer.prompt([
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
        console.log(answers)
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
