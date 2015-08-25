import pkg from '../package.json'

describe('version', () => {

  it('should return module version', () => {
    pkg.version.should.be.a.String()
  })

})
