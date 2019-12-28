const faker = require('faker')
const { factory } = require('factory-girl')
const User = require('../src/app/models/User')

factory.define('User', User, {
  name: faker.name.findName(),
  user_name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
})

module.exports = factory
