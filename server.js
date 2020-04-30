// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/htmlRoutes'))
const express = require('express')
const morgan = require('morgan')

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

//Morgan

// Sets an initial port.
var PORT = process.env.PORT || 8080

// Sets up the Express app to handle data parsing

// morgan token
morgan.token('host', function (req, res) {
  return req.hostname
})
// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// require('./routes/apiRoutes.js')(app)
// require('./routes/htmlRoutes.js')(app)

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
  console.log('App listening on PORT: ' + PORT)
})
