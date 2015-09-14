import Task from '../models/task'

export class GenerateFromBlueprint extends Task {
  constructor() {
    super()
    this.blueprintFunction = 'install'
  }

  run(options) {

  }
}
