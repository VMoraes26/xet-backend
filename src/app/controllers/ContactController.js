
const User = require('../models/User')

class ContactController {
  async list(req, res) {
    const { userId } = req

    const user = await User.findByPk(userId, {
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

    return res.json(user.contacts)
  }

  async store(req, res) {
    const { userId } = req
    const { contact_id } = req.body

    const user = await User.findByPk(userId)
    const contact = await User.findByPk(contact_id)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!contact) {
      return res.status(400).json({ error: 'Contact not found' })
    }

    await user.addContact(contact)

    return res.send()
  }

  async delete(req, res) {
    const { userId } = req
    const { id: contact_id } = req.params

    const user = await User.findByPk(userId)
    const contact = await User.findByPk(contact_id)

    console.log(await User.findAll())

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!contact) {
      return res.status(400).json({ error: 'Contact not found' })
    }

    await user.removeContact(contact)

    return res.send()
  }
}

module.exports = new ContactController()
