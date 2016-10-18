import path from 'path'

export default Object.freeze({
  db: {
    options: {
      dialect: 'sqlite',
      storage: path.join(__dirname, '../test/db.sqlite'),
      logging: false
    }
  }
})
