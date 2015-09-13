import cli from './cli'

export default function(spec) {
  try {
    return cli(spec).run()
  } catch (err) {
    console.error(err)
  }
}
