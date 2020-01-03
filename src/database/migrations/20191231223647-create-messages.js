module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        alowNull: false,
      },
      contact_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'contacts',
          },
          key: 'id',
        },
        onUpdate: 'cascade',
      },
      message: {
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
    return queryInterface.dropTable('messages')
  },
}
