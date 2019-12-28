
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        alowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        alowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        unique: true,
        alowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        alowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        alowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        alowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        alowNull: false,
      },
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users')
  },
}
