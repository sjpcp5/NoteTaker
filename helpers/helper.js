const fs = require("fse");

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

const getDate = () => new Date().toString();

function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
    const row = array.find((r) => r.id == id);
    if (!row) {
      reject({
        message: "ID is not found or valid",
        status: 404,
      });
    }
  });
}
function writeJSONFile(filename, text) {
  fs.writeFileSync(filename, JSON.stringify(text), "utf8", (err) => {
    if (err) {
      console.log(err);
      console.log("did not write to JSON file");
    }
  });
}

module.exports = {
  getNewID,
  getDate,
  mustBeInArray,
  writeJSONFile,
};
