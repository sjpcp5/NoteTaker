const note = require("../models/notesModel");
const express = require("express");
const router = express.Router();
const middlewares = require("../helpers/middleware");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // all notes
  app.get("/api/notes", async (req, res) => {
    console.log("getPost A");
    await note
      .getNotes()
      .then((notes) => res.json(notes))
      .catch((err) => {
        if (err.status) {
          res.status(err.status).json({ message: err.message });
        } else {
          res.status(500).json({ message: err.message });
        }
      });
  });
  // get posts by id
  app.get("api/notes/:id", middlewares.mustBeAnumber, async (req, res) => {
    const id = req.params.id;
    await note
      .getNote(id)
      .then((note) => res.json(note))
      .catch((err) => {
        if (err.status) {
          res.status(err.status).json({ message: err.message });
        } else {
          res.status(500).json({ message: err.message });
        }
      });
  });
  // update notes

  // delete notes
};
