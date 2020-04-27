// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// const notes = require("../assets/js/index.js");
const db = require("../db/note.json");
// const journal = require("../journal.json.js");
const fs = require("fs-extra");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    console.log("A1");
    fs.readJSON(db)
      .then((db) => {
        console.log(db, "A");
        return res.json(db);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  //     app.get("/api/notes/:id", function(req, res) {
  //         db.title.findAll({
  //             include: [db.Post]
  //         }).then(function(dbtitle) {
  //             res.json(dbtitle)
  //         });
  //     });

  //     // API POST Requests
  //     // Below code handles when a user submits a form and thus submits data to the server.
  //     // In each of the below cases, when a user submits form data (a JSON object)
  //     // ...the JSON is pushed to the appropriate JavaScript array
  //     // (ex. User fills out a reservation request... this data is then sent to the server...
  //     // Then the server saves the data to the tableData array)
  //     // ---------------------------------------------------------------------------

  //     app.post("/api/notes", function(req, res) {
  //         // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
  //         // It will do this by sending out the value "true" have a table
  //         // req.body is available since we're using the body parsing middleware
  //         var newNote = req.body;
  //         console.log(newNote, "B");
  //         fs.writeJSON(db, { newNote })
  //             .then(() => {
  //                 fs.readJSON(db.newNote)
  //             }).catch(err => {
  //                 res.status(400).json(err, "err B");
  //             });

  //         if (notes.length < 5) {
  //             db.push(req.body);
  //             res.json(true);
  //         } else {
  //             db.push(req.body);
  //             res.json(false);
  //         }
  //     });

  //     // ---------------------------------------------------------------------------
  //     // I added this below code so you could clear out the table while working with the functionality.
  //     // Don"t worry about it!

  //     app.post("/api/clear", function(req, res) {
  //         // Empty out the arrays of data
  //         tableData.length = 0;
  //         waitListData.length = 0;

  //         res.json({ ok: true });
  //     });
};
