const Message = require('../models/Message')
const User = require('../models/User')
const Contact = require('../models/Contact')

class MessageController {
  async list(req, res) {
    const { userId } = req

    const user = User.findByPk(userId, {
      attributes: [],
      include: {
        association: 'talks',
        attributes: ['id', 'name', 'user_name'],
        through: {
          attributes: ['contact_id'],
          as: 'contact',
        },
      },
    })


    res.json(user.contacts)
  }

  async update(req, res) {
  }

  async delete(req, res) {
  }
}

module.exports = new MessageController()
