const bcrypt = require('bcryptjs')
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('User', () => {
  it('should encrypt user password', async (done) => {
    await truncate()
    const user = await factory.create('User', {
      password: '123456',
    })

    const compareHash = await bcrypt.compare('123456', user.password_hash)
    expect(compareHash).toBe(true)
    done()
  })
})
