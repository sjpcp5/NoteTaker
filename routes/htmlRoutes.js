// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require('path')
const router = express.Router()
module.exports = router

// ===============================================================================
// ROUTING
// ===============================================================================
router.use('/api/notes', require('./apiRoutes'))

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// If no matching route is found default to home
router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
