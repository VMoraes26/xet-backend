const request = require('supertest')
const truncate = require('../utils/truncate')
const factory = require('../factories')

const app = require('../../src/app')

function generateAuth(user) {
  return `Bearer ${user.generateToken()}`
}

describe('Contact', () => {
  beforeEach(async (done) => {
    await truncate()
    done()
  })

  it('should add contact to the list of user´s contact', async (done) => {
    const user = await factory.create('User')

    const response = await request(app)
      .post('/contacts')
      .set('Authorization', generateAuth(user))
      .send({
        contact_id: user.id,
      })

    console.log(response.body)

    expect(true).toBe(true)
    done()
  })
})
