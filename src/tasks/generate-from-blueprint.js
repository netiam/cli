import Task from '../models/task'

export class GenerateFromBlueprint extends Task {
  constructor() {
    this.blueprintFunction = 'install'
  }

  run(options) {

  }
}
