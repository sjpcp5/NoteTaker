const helper = require('../helpers/helper.js')
const path = require('path')
const filename = path.join(__dirname, '../data/notes.json')
// let notes = require('../data/notes.json')
function getNotes () {
  return new Promise((resolve, reject) => {
    helper.readJSONFile(filename).then(json => {
      console.log(json, 'F')
      if (json.length === 0) {
        reject({
          message: 'no notes are available or found',
          status: 202 // request recieved and valid but not acted on
        })
      }
    })
    resolve(json) // display array of notes code, 200 ok
  })
}

function insertNote (newNote) {
  return new Promise((resolve, reject) => {
    helper
      .readJSONFile(filename)
      .then(json => {
        const id = helper.getNewId(json)
        const date = {
          createdAt: helper.getDate(),
          updatedAt: helper.getDate()
        }
        newNote = { id, ...date, ...newNote }

        json.push(newNote)

        helper.writeJSONFile(filename, json)

        resolve(newNote)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

function deleteNote (id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(json => {
        helper.readJSONFile(filename)
        console.log(json, 'B')
        return json
      }, id)
      .then(json => {
        note = json.filter(notes => notes.id !== id)
        helper.writeJSONFile(filename, note)
        helper.readJSONFile(filename)
        console.log(note, 'A read')
        resolve(id)
      })
      .catch(err => reject(err))
  })
}
// all functions return a promise

module.exports = {
  insertNote,
  getNotes,
  deleteNote
}
