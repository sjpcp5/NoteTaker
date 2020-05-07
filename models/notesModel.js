const helper = require('../helpers/helper.js')
const path = require('path')
const filename = path.join(__dirname, '../data/notes.json')
let notes = require(filename)
function getNotes () {
  return new Promise((resolve, reject) => {
    helper.readJSONFile(filename).then(json => {
      if (json.length === 0) {
        reject({
          message: 'no notes are available or found',
          status: 202 // request recieved and valid but not acted on
        })
      }
      resolve(json)
    })
    // display array of notes code, 200 ok
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
      .mustBeInArray(notes, id)
      .then(() => {
        let note = notes.filter(notes => notes.id !== id)
        console.log('ab', note)
        helper.writeJSONFile(filename, note)
        resolve()
      })
      .catch(err => reject(err))
  })
}
// function deleteNote (id) {
//   return new Promise((resolve, reject) => {
//     helper
//       .readJSONFile(filename)
//       .then(json => {
//         return helper.mustBeInArray(json, id)
//       })
//       .then(json => {
//         console.log('b', json)
//         let arry = []
//         arry.push(json)
//         console.log('c', arry)
//         const note = arry.filter(notes => notes.id !== id)
//         resolve(id)
//         return note
//       })
//       .then(note => {
//         helper.writeJSONFile(filename, note)
//         helper.readJSONFile(filename)
//         console.log(filename, 'A read')
//       })
//       .catch(err => reject(err))
//   })
// }
// all functions return a promise

module.exports = {
  insertNote,
  getNotes,
  deleteNote
}
