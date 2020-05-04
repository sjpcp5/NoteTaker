const fs = require('fs-extra')
const getNewId = array => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}

const getDate = () => new Date().toString()

function mustBeInArray (array, id) {
  return new Promise((resolve, reject) => {
    console.log(array, 'C')

    const row = array.find(r => r.id == id)
    if (!row) {
      reject({
        message: 'ID is not found or valid',
        status: 404
      })
    }
    resolve(row)
  })
}

function readJSONFile (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) return reject(err)
      resolve(JSON.parse(data))
    })
  })
}

function writeJSONFile (filename, data) {
  const content = JSON.stringify(data, null, 2)
  fs.writeFile(filename, content, err => {
    if (err) {
      console.log(err, filename)
      console.log('did not write to JSON file')
    }
  })
}

module.exports = {
  getDate,
  mustBeInArray,
  writeJSONFile,
  getNewId,
  readJSONFile
}
