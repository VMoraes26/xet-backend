const request = require('supertest')
const truncate = require('../utils/truncate')
const factory = require('../factories')

const app = require('../../src/app')

describe('Authentication', () => {
  beforeEach(async (done) => {
    await truncate()
    done()
  })

  test('should return jwt token when authenticated', async (done) => {
    const user = await factory.create('User', {
      password: '123123',
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      })

    expect(response.body).toHaveProperty('token')
    done()
  })

  it('should not authenticate with invalid email', async (done) => {
    const user = await factory.create('User', {
      email: 'testEmail',
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'testEmailWrong',
        password: user.password,
      })

    expect(response.status).toBe(401)
    done()
  })

  it('should not authenticate with invalid password', async (done) => {
    const user = await factory.create('User', {
      password: 'test',
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'testWrong',
      })

    expect(response.status).toBe(401)
    done()
  })
})
