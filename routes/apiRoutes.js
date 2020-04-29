const journal = require("../models/notesModel").default;
// const express = require("express");
// const router = express.Router();
const middlewares = require("../helpers/middleware");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // all notes
  app.get("/api/notes", async (req, res) => {
    console.log("getPost A");
    await journal
      .getNotes()
      .then((post) => res.json(post))
      .catch((err) => {
        if (err.status) {
          res.status(err.status).json({ message: err.message });
        } else {
          res.status(500).json({ message: err.message });
        }
      });
  });
  // insert new note
  app.post("/api/notes", middlewares.checkFieldsNotes, async (req, res) => {
    console.log(req.body, "A");
    await journal
      .insertNote(req.body)
      .then((journal) =>
        res.status(201).json({
          message: `You have written #${journal.id} yay!`,
          content: journal,
        })
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  });
  // update notes
  // app.put("api/notes/:id", middlewares.mustBeAnumber, async (req, res) => {
  //   await note;
  // });

  // delete notes
};
