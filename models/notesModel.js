const filename = "../db/notes.json";
let notes = require(filename);
const helper = require("../helpers/helper");

function getNotes() {
  return new Promise((resolve, reject) => {
    if (notes.length === 0) {
      reject({
        message: "no notes are available or found",
        status: 202, // request recieved and valid but not acted on
      });
    }
    resolve(notes); // display array of notes code, 200 ok
  });
}

function getNote(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(notes, id)
      .then((notes) => resolve(notes))
      .catch((err) => reject(err));
  });
}
function insertNote(newNote) {
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNewId(notes) };
    const date = {
      createdAt: helper.getDate(),
      updatedAt: helper.getDate(),
    };
    newNote = { ...id, ...date, ...newNote };
    notes.push(newNote);
    helper.writeJSONFile(filename, notes);
    resolve(newNote);
  });
}

function updateNote(id, newNote) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(notes, id)
      .then((notes) => {
        const index = notes.findIndex((n) => n.id == note.id);
        id = { id: note.id };
        const date = {
          createdAt: note.createdAt,
          updatedAt: helper.getDate(),
        };
        notes[index] = { ...id, ...date, ...newNote };
        helper.writeJSONFile(filename, notes);
        resolve(notes[index]);
      })
      .catch((err) => reject(err));
  });
}
function deleteNote(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(notes, id)
      .then(() => {
        notes = notes.filter((n) => n.id !== id);
        helper.writeJSONFile(filename, notes);
        resolve();
      })
      .catch((err) => reject(err));
  });
}
// all functions return a promise

module.exports = {
  insertNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
};
