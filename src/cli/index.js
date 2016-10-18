import cli from './cli'

module.exports = function(spec) {
  return cli(spec).run()
}
