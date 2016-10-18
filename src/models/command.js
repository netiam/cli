import _ from 'lodash'

const OPT_INSIDE_PROJECT = 'insideProject'
const OPT_OUTSIDE_PROJECT = 'outsideProject'
const OPT_EVERYWHERE = 'everywhere'

class Command {
  constructor(name, aliases, availableOptions, anonymousOptions) {
    this.isWithinProject = true

    this.name = name

    this.aliases = aliases || []

    this.availableOptions = availableOptions || []
    this.anonymousOptions = anonymousOptions || []

    this.works = OPT_INSIDE_PROJECT
  }

  registerOptions(options) {
    let extendedAvailableOptions = options && options.availableOptions || []
    let extendedAnonymousOptions = options && options.anonymousOptions || []

    this.anonymousOptions = _.union(this.anonymousOptions.slice(0), extendedAnonymousOptions)
    this.availableOptions = _.union(this.availableOptions.slice(0), extendedAvailableOptions)

    var optionKeys = _.uniq(_.pluck(this.availableOptions, 'name'))

    //optionKeys.map(this.mergeDuplicateOption.bind(this))

    this.optionsAliases = this.optionsAliases || {}

    //this.availableOptions.map(this.validateOption.bind(this))
  }

  beforeRun() {
  }

  parseArgs() {
  }

  printBasicHelp() {
  }

  printDetailedHelp() {
  }

  run() {
    throw new Error('Command needs to have run() defined')
  }
}

export default Command
