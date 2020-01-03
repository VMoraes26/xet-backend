const request = require('supertest')
const faker = require('faker')
const truncate = require('../utils/truncate')
const factory = require('../factories')

const app = require('../../src/app')

describe('User', () => {
  beforeEach(async (done) => {
    await truncate()
    done()
  })

  describe('List', () => {
    it('should list all users', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${user.generateToken()}`)

      expect(response.status).toBe(200)
      done()
    })
  })

  describe('Create', () => {
    it('should create an user', async (done) => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(200)
      done()
    })

    it('should not create an user without name', async (done) => {
      const response = await request(app)
        .post('/users')
        .send({
          user_name: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
      done()
    })

    it('should not create an user without user_name', async (done) => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
      done()
    })

    it('should not create an user without email', async (done) => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
      done()
    })

    it('should not create an user without password', async (done) => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          email: faker.internet.email(),
        })

      expect(response.status).toBe(400)
      done()
    })

    it('should not create an user with duplicated email', async (done) => {
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
      done()
    })

    it('should not create an user with duplicated user_name', async (done) => {
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
      done()
    })

    it('should not create an user if user_name length has less than 4 characters', async (done) => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.random.alphaNumeric(3),
          email: faker.internet.email(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
      done()
    })

    it('should not create an user if password length has less than 8 characters', async (done) => {
      const response = await request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.random.alphaNumeric(7),
        })

      expect(response.status).toBe(400)
      done()
    })
  })

  describe('Show', () => {
    it('should show user details', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .get(`/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)

      expect(response.status).toBe(200)
      done()
    })

    it('should return not found with invalid user id', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .get('/users/0')
        .set('Authorization', `Bearer ${user.generateToken()}`)

      expect(response.status).toBe(404)
      done()
    })
  })

  describe('Update', () => {
    it('should update user details', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(200)
      done()
    })

    it('should not update user details with duplicated user_name', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          name: faker.name.findName(),
          user_name: user.user_name,
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(409)
      done()
    })

    it('should not update user details without name', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          user_name: faker.internet.userName(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
      done()
    })

    it('should not update user details without user_name', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          name: faker.name.findName(),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
      done()
    })

    it('should not update user details without password', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
        })

      expect(response.status).toBe(400)
      done()
    })

    it('should not update user details if user_name length has less than 4 characters', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          name: faker.name.findName(),
          user_name: faker.random.alphaNumeric(3),
          password: faker.internet.password(8),
        })

      expect(response.status).toBe(400)
      done()
    })

    it('should not update user details if password length has less than 8 characters', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          name: faker.name.findName(),
          user_name: faker.internet.userName(),
          password: faker.random.alphaNumeric(7),
        })

      expect(response.status).toBe(400)
      done()
    })
  })

  describe('Delete', () => {
    it('should delete user', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)

      expect(response.status).toBe(200)
      done()
    })

    it('should return not found with invalid user id', async (done) => {
      const user = await factory.create('User')

      const response = await request(app)
        .delete('/users/0')
        .set('Authorization', `Bearer ${user.generateToken()}`)

      expect(response.status).toBe(404)
      done()
    })
  })
})
