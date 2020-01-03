const { Model, DataTypes } = require('sequelize')

class Contact extends Model {
  static init(sequelize) {
    super.init({
      contact_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    }, {
      sequelize,
    })
  }

  static associate(models) {
    this.belongsTo(models.Contact, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.Contact, { foreignKey: 'contact_id', throught: 'users', as: 'talks' })
    this.hasMany(models.Message, { foreignKey: 'id', as: 'messages' })
  }
}

module.exports = Contact
