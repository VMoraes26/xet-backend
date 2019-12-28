const routes = require('express').Router()

const UserController = require('./app/controllers/UserController')

routes.get('/users', UserController.list)
routes.post('/users', UserController.store)
routes.get('/users/:id', UserController.show)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

module.exports = routes
