export default Object.freeze({
  'app': {
    'workers': 1,
    'port': 3000
  },
  'db': {
    'database': 'clustar_dev',
    'username': 'clustar_dev',
    'password': 'clustar_dev',
    'options': {
      'dialect': 'mysql',
      'host': 'localhost',
      'logging': false,
      'define': {
        'charset': 'utf8',
        'collate': 'utf8_general_ci'
      }
    }
  }
})
