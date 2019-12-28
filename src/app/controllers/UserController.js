const User = require('../models/User')

class UserController {
  async list(req, res) {
    const user = await User.findAll({ attributes: ['id', 'name', 'user_name'] })

    return res.json(user)
  }

  async store(req, res) {
    const {
      name,
      user_name,
      email,
      password,
    } = req.body

    if (!name || !user_name || !email || !password) {
      return res.status(400).send()
    }

    let userExists = await User.findOne({ where: { email } })

    if (userExists) {
      return res.status(409).send()
    }

    userExists = await User.findOne({ where: { user_name } })

    if (userExists) {
      return res.status(409).send()
    }

    if (user_name.length < 4) {
      return res.status(400).send()
    }

    if (password.length < 8) {
      return res.status(400).send()
    }

    const user = await User.create({
      name,
      user_name,
      email,
      password,
    })

    return res.json(user)
  }

  async show(req, res) {
    const { id } = req.params

    const user = await User.findByPk(id)

    res.json(user)
  }

  async update(req, res) {
    const { id } = req.params

    const {
      name,
      user_name,
      password,
    } = req.body

    if (!name || !user_name || !password) {
      return res.status(400).send()
    }

    const userExists = await User.findOne({ where: { user_name } })

    if (userExists) {
      return res.status(409).send()
    }

    if (user_name.length < 4) {
      return res.status(400).send()
    }

    if (password.length < 8) {
      return res.status(400).send()
    }

    const user = await User.findByPk(id)

    user.set({
      name,
      user_name,
      password,
    })

    return res.json(user)
  }

  async delete(req, res) {
    const { id } = req.params

    const user = await User.findByPk(id)

    user.destroy()

    return res.send()
  }
}

module.exports = new UserController()
