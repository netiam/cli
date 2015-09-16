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
    description: 'Awesome project description',
    version: '1.0.0-semantically-released'
  },

  secret: undefined,

  server: {
    port: 3000,
    workers: 2,
    env: 'production',
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
    host: undefined,
    port: undefined,
    name: undefined
  }
})
