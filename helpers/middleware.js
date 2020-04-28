function mustBeAnumber(req, res, next) {
  const id = req.params.id;

  if (!Number.isInteger(parseInt(id))) {
    res.status(400).json({ message: "ID must be a number" });
    //bad request
  } else {
    next(); // pass control to the next handler
  }
}

function checkFieldsNotes(req, res, next) {
  const { title, text, tags } = req.body;

  if (title && text && tags) {
    next(); // pass control to next handler
  } else {
    res.status(400).json({ message: "fields do not match model" });
    // bad request
  }
}

module.exports = {
  mustBeAnumber,
  checkFieldsNotes,
};
