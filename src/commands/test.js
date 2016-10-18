import fs from 'fs'
import path from 'path'
import recast from 'recast'
import util from 'util'

export default function destroy({ui}) {

  function run() {
    try {
      const filePath = path.resolve('../test/fixtures/users.js')
      const file = fs.readFileSync(filePath, {encoding: 'utf8'})
      const ast = recast.parse(file)
      const d = ast.program.body[ast.program.body.length - 1].declaration.body.body[1]
      console.log(util.inspect(d, {depth: 7}))
    } catch (err) {
      console.error(err)
    }
  }

  return Object.freeze({
    name: 'test',
    works: 'everywhere',
    description: 'Tests experimental command/task code. Not safe for use.',
    aliases: [],

    availableOptions: [],

    anonymousOptions: [],

    run
  })
}
