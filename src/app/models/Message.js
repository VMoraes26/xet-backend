const { Model, DataTypes } = require('sequelize')

class Message extends Model {
  static init(sequelize) {
    super.init({
      contact_id: DataTypes.INTEGER,
      message: DataTypes.STRING,
    }, {
      sequelize,
    })
  }

  static associate(models) {
    this.belongsTo(models.Contact, { foreignKey: 'contact_id', as: 'messages' })
  }
}

module.exports = Message
