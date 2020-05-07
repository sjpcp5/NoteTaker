const journal = require('../models/notesModel')
const middlewares = require('../helpers/middleware')

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // all notes
  app.get('/api/notes', async (req, res) => {
    await journal
      .getNotes()
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
  app.post('/api/notes', middlewares.checkFieldsNotes, (req, res) => {
    journal
      .insertNote(req.body)
      .then(journal => {
        res.status(201).json({
          message: `You have written #${journal.id} yay!`,
          content: journal
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
      })
  })
  // update notes
  // app.put("api/notes/:id", middlewares.mustBeAnumber, async (req, res) => {
  //   await note;
  // });

  // delete notes
  app.delete('/api/notes/:id', middlewares.mustBeAnumber, (req, res) => {
    const id = req.params.id
    journal
      .deleteNote(id)
      .then(journal => {
        res.json(202).json({
          // message: `You have deleted #${journal.id}`,
          // content: journal
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
      })
  })
}
