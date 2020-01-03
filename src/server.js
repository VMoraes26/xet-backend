const app = require('./app')

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {},
  })
})
app.listen(3000)
