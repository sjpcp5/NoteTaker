/* Express configuration */
const express = require('express')
const morgan = require('morgan')
// App
const app = express()

//Morgan for logging on server in the terminal
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Sets an initial port.
var PORT = process.env.PORT || 3000

// morgan token
morgan.token('host', function (req, res) {
  return req.hostname
})
// Html routes
require('./routes/htmlRoutes.js')(app)
require('./routes/apiRoutes.js')(app)

app.listen(PORT, function () {
  console.log('App listening on PORT: ' + PORT)
})
