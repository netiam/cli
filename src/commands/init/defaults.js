export default Object.freeze({
  node: {
    version: 4
  },

  author: {
    name: 'Awesome developer',
    email: 'dev@mail.company'
  },

  project: {
    name: 'Awesome project',
    description: 'Awesome project description'
  },

  secret: undefined,

  server: {
    port: 3000,
    features: []
  },

  git: {
    url: undefined
  },

  auth: {
    fb: {
      clientId: undefined,
      clientSecret: undefined
    }
  },

  db: {
    type: 'Memory',
    username: undefined,
    password: undefined,
    host: 'localhost',
    port: undefined,
    name: undefined
  }
})
