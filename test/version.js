import pkg from '../package.json'

describe('module', () => {

  it('should not have version property', () => {
    pkg.should.not.have.property('version')
  })

})
