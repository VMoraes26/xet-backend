const routes = require('express').Router()

const authMiddleWare = require('./app/middlewares/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ContactController = require('./app/controllers/ContactController')
const MessageController = require('./app/controllers/MessageController')

routes.post('/sessions', SessionController.store)
routes.post('/users', UserController.store)

routes.use(authMiddleWare)

routes.get('/users', UserController.list)
routes.get('/users/:id', UserController.show)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.get('/contacts', ContactController.list)
routes.post('/contacts', ContactController.store)
routes.delete('/contacts/:id', ContactController.delete)

routes.get('/messages', MessageController.list)
routes.put('/messages/:id', MessageController.update)
routes.delete('/messages/:id', MessageController.delete)

module.exports = routes
