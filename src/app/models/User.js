const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
    }, {
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        },
      },
      sequelize,
    })
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'user_id', through: 'contacts', as: 'contact_owner' })
    this.belongsToMany(models.User, { foreignKey: 'contact_id', through: 'contacts', as: 'talks' })
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET)
  }
}

module.exports = User
