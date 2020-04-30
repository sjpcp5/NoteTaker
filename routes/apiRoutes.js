const journal = require('../models/notesModel')
const middlewares = require('../helpers/middleware')

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // all notes
  app.get('/api/notes', async (req, res) => {
    console.log('getPost A')
    await journal
      .getNotes()
      .then(post => res.json(post))
      .catch(err => {
        if (err.status) {
          res.status(err.status).json({ message: err.message })
        } else {
          res.status(500).json({ message: err.message })
        }
      })
  })
  // get note
  app.get('/api/notes/:id', middlewares.mustBeAnumber, async (req, res) => {
    const id = req.params.id

    await journal
      .getPost(id)
      .then(journal => res.json(journal))
      .catch(err => {
        if (err.status) {
          res.status(err.status).json({ message: err.message })
        } else {
          res.status(500).json({ message: err.message })
        }
      })
  })
  // insert new note
  app.post('/api/notes', middlewares.checkFieldsNotes, async (req, res) => {
    console.log(req.body, 'A')
    await journal
      .insertNote(req.body)
      .then(
        journal => console.log(journal, 'C'),
        res.status(201).json({
          message: `You have written #${journal.id} yay!`,
          content: journal
        })
      )
      .catch(err => res.status(500).json({ message: err.message }))
  })
  // update notes
  // app.put("api/notes/:id", middlewares.mustBeAnumber, async (req, res) => {
  //   await note;
  // });

  // delete notes
}
