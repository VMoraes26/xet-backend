const request = require('supertest')
const faker = require('faker')
const truncate = require('../utils/truncate')
const factory = require('../factories')

const app = require('../../src/app')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  describe('List', () => {
    it('should list all users', async () => {
      const response = await request(app)
        .get('/users')

      expect(response.status).toBe(200)
    })
  })

  describe('Create', () => {
    it('should create an user', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(200)
    })

    it('should not create an user without name', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          user_name: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
    })

    it('should not create an user without user_name', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
    })

    it('should not create an user without email', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
    })

    it('should not create an user without password', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          email: faker.internet.email(),
        })

      expect(response.status).toBe(400)
    })

    it('should not create an user with duplicated email', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          email: user.email,
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(409)
    })

    it('should not create an user with duplicated user_name', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: user.user_name,
          email: faker.internet.email(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(409)
    })

    it('should not create an user if user_name length has less than 4 characters', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.random.alphaNumeric(faker.random.number(3)),
          email: faker.internet.email(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
    })

    it('should not create an user if password length has less than 8 characters', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.random.alphaNumeric(faker.random.number(7)),
        })

      expect(response.status).toBe(400)
    })
  })

  describe('Show', () => {
    it('should show user details', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .get(`/users/${user.id}`)

      expect(response.status).toBe(200)
    })
  })

  describe('Update', () => {
    it('should update user details', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(200)
    })

    it('should not update user details with duplicated user_name', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .send({
          name: faker.name.findName(),
          user_name: user.user_name,
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(409)
    })

    it('should not update user details without name', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          user_name: faker.internet.userName(),
          password: faker.internet.password(),
        })

      expect(response.status).toBe(400)
    })

    it('should not update user details without user_name', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .send({
          name: faker.name.findName(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
    })

    it('should not update user details without password', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
        })

      expect(response.status).toBe(400)
    })

    it('should not update user details if user_name length has less than 4 characters', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .send({
          name: faker.name.findName(),
          user_name: faker.random.alphaNumeric(faker.random.number(3)),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
    })

    it('should not update user details if password length has less than 8 characters', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          password: faker.random.alphaNumeric(faker.random.number(7)),
        })

      expect(response.status).toBe(400)
    })
  })

  describe('Delete', () => {
    it('should delete user', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .delete(`/users/${user.id}`)

      expect(response.status).toBe(200)
    })
  })
})
