const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const db = {}

const sequelize = new Sequelize(dbConfig)

const modelsPath = path.join(__dirname, '..', 'app', 'models')

fs
  .readdirSync(modelsPath)
  .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const modelName = file.split('.')[0]
    const model = require(path.join(modelsPath, file))
    model.init(sequelize)
    db[modelName] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
